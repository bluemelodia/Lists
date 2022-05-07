import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { HeaderLevel } from '../../../interfaces/header.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { AddMeeting } from '../../../interfaces/service/service-objects.interface';

import { LoadingService } from '../../../services/loading.service';
import { MeetingService } from '../../../services/meeting.service';

interface MeetingResponse {
	error: boolean,
	meetings?: AddMeeting[]
}

@Component({
	selector: 'ml-planner-meetings',
	templateUrl: './meetings.component.html',
	styleUrls: ['./meetings.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent implements OnInit, OnDestroy {
	public headerLevel = HeaderLevel;

	private _meetingsResponse$ = new Subject<MeetingResponse>();
	public meetingResponse$ = this._meetingsResponse$.asObservable();

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private loadingService: LoadingService,
		private meetingService: MeetingService,
	) { }

	ngOnInit(): void {
		this.getMeetings();
	}

	public getMeetings(): void {
		this.loadingService.startLoading();
		this.meetingService.getMeetings()
			.pipe(
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						this._meetingsResponse$.next({
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
			.subscribe((meetings: AddMeeting[]) => {
				this._meetingsResponse$.next({
					error: !meetings,
					meetings: meetings
				});
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
