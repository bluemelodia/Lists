import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit,
} from "@angular/core";
import { BehaviorSubject, forkJoin, of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { ListType } from "../../constants/list.constants";

import { Task } from "../../interfaces/event/task.interface";
import { ResponseStatus } from "../../interfaces/response.interface";
import { AddMeeting, AddRecipient } from "../../interfaces/service/service-objects.interface";

import { LoadingService } from "../../services/loading.service";
import { MeetingService } from "../../services/meeting.service";
import { RecipientService } from "../../services/recipient.service";
import { TaskService } from "../../services/task.service";

import { RecipientUtils } from "../../utils/recipient.utils";
import { TaskUtils } from "../../utils/task.utils";

@Component({
	selector: "ml-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
	@HostBinding("class.loading") public isLoading = false;

	public _error$ = new BehaviorSubject<boolean>(false);
	public error$ = this._error$.asObservable();

	public type = ListType;

	private _solar$ = new Subject<AddRecipient[]>();
	public solar$ = this._solar$.asObservable();

	private _lunar$ = new Subject<AddRecipient[]>();
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
	) { }

	public ngOnInit(): void {
		this.getData();
	}

	public getData(): void {
		this.toggleLoading(true);

		forkJoin([
			this.recipientService.getRecipients(),
			this.meetingService.getMeetings(),
			this.tasksService.getTasks()
		])
			.pipe(
				catchError((error: ResponseStatus) => {
					console.log("===> caught error: ", error);
					if (error === ResponseStatus.ERROR) {
						this._error$.next(true);
					}
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.toggleLoading(false);
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(([birthdays, meetings, tasks]) => {
				this._error$.next(false);

				if (birthdays) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					this._solar$.next(RecipientUtils.getSummary(birthdays?.solar));
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					this._lunar$.next(RecipientUtils.getSummary(birthdays?.lunar));
				}

				if (meetings) {
					this._meetings$.next(meetings);
				}

				if (tasks) {
					this._tasks$.next(TaskUtils.getSummary(tasks));
				}
			});
	}

	private toggleLoading(isLoading: boolean): void {
		this.isLoading = isLoading;

		if (isLoading) {
			this.loadingService.startLoading();
		} else {
			this.loadingService.stopLoading();
		}
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}