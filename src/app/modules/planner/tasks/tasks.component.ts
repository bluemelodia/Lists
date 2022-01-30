import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { DialogAction, DialogPage } from "../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../interfaces/header.interface";
import { Task } from "../../../interfaces/event/task.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";

import { DialogService } from "../../../services/dialog.service";
import { LoadingService } from "../../../services/loading.service";
import { TaskService } from "../../../services/task.service";

@Component({
	selector: 'planner-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, OnDestroy {
	public headerLevel = HeaderLevel;

	private tasks$ = new Subject<Task[]>();
	public tasksList$ = this.tasks$.asObservable();

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private loadingService: LoadingService,
		private tasksService: TaskService,
	) { }

	ngOnInit(): void {
		this.getTasks();
	}

	public getTasks(): void {
		this.loadingService.startLoading();
		this.tasksService.getTasks()
			.pipe(
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Get, DialogPage.Tasks);
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((tasks: Task[]) => {
				this.tasks$.next(tasks);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}