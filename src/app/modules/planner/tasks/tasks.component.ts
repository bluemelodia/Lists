import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { HeaderLevel } from "../../../interfaces/header.interface";
import { Task } from "../../../interfaces/event/task.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";

import { LoadingService } from "../../../services/loading.service";
import { TaskService } from "../../../services/task.service";

interface TasksResponse {
	error: boolean,
	tasks?: Task[]
}

@Component({
	selector: 'ml-planner-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, OnDestroy {
	public headerLevel = HeaderLevel;

	private _tasksResponse$ = new Subject<TasksResponse>();
	public tasksResponse$ = this._tasksResponse$.asObservable();

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
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
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						this._tasksResponse$.next({
							error: true
						});
					}

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
				console.log("===<> got tasks: ", tasks);
				this._tasksResponse$.next({
					error: !tasks,
					tasks: tasks
				})
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}