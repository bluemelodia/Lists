import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

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
	private ngUnsubscribe$ = new Subject<void>();

	public birthdays: RecipientList;
	public meetings: AddMeeting[];
	public tasks: Task[];

	constructor(
		private loadingService: LoadingService,
		private meetingService: MeetingService,
		private recipientService: RecipientService,
		private tasksService: TaskService,
	) {}

	public ngOnInit(): void {
		console.info("[Home] Init");
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
			});
	}

	public ngOnDestroy(): void {
		console.log("===> destroy home");
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}