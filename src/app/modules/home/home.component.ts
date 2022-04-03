import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit,
} from "@angular/core";
import { forkJoin, of, Subject } from "rxjs";
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

interface HomeResponse {
	error: boolean,
	solar?: AddRecipient[],
	lunar?: AddRecipient[],
	meetings?: AddMeeting[],
	tasks?: Task[]
}

@Component({
	selector: "ml-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
	@HostBinding("class.loading") public isLoading = false;

	public _homeResponse$ = new Subject<HomeResponse>();
	public homeResponse$ = this._homeResponse$.asObservable();

	public type = ListType;

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
					if (error === ResponseStatus.ERROR) {
						this._homeResponse$.next({
							error: true
						});
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
				this._homeResponse$.next({
					error: false,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					solar: birthdays ? RecipientUtils.getSummary(birthdays?.solar) : null,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					lunar: birthdays ? RecipientUtils.getSummary(birthdays?.lunar) : null,
					meetings: meetings,
					tasks: tasks ? TaskUtils.getSummary(tasks) : null
				});
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