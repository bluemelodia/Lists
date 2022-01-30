import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { ListType } from "../../constants/list.constants";

import { RecipientList } from "../../interfaces/event/recipient.interface";
import { Task } from "../../interfaces/event/task.interface";
import { ResponseStatus } from "../../interfaces/response.interface";
import { AddMeeting } from "../../interfaces/service/service-objects.interface";

import { LoadingService } from "../../services/loading.service";
import { MeetingService } from "../../services/meeting.service";
import { RecipientService } from "../../services/recipient.service";
import { TaskService } from "../../services/task.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
	public type = ListType;

	private _solar$ = new Subject<RecipientList>();
	public solar$ = this._solar$.asObservable();

	private _lunar$ = new Subject<RecipientList>();
	public lunar$ = this._lunar$.asObservable();

	private _meetings$ = new Subject<AddMeeting[]>();
	public meetings$ = this._meetings$.asObservable();

	private _tasks$ = new Subject<Task[]>();
	public tasks$ = this._tasks$.asObservable(); 
	
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private loadingService: LoadingService,
		private meetingService: MeetingService,
		private recipientService: RecipientService,
		private tasksService: TaskService,
	) {}

	public ngOnInit(): void {
		this.getData();
	}

	public getData(): void {
		this.loadingService.startLoading();

		forkJoin([
			this.recipientService.getRecipients(),
			this.meetingService.getMeetings(),
			this.tasksService.getTasks()
		])
			.pipe(
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						// don't show dialog here, instead show error message
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
			.subscribe(([ birthdays, meetings, tasks]) => {
				console.info("[Home] Received lists: ", birthdays, meetings, tasks);
				this._solar$.next(birthdays?.solar);
				this._lunar$.next(birthdays?.lunar);
				this._meetings$.next(meetings);
				this._tasks$.next(tasks);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}