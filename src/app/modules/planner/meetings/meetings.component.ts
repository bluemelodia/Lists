import { 
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { DialogAction, DialogPage } from '../../../interfaces/dialog.interface';
import { HeaderLevel } from '../../../interfaces/header.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { AddMeeting } from '../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../services/dialog.service';
import { LoadingService } from '../../../services/loading.service';
import { MeetingService } from '../../../services/meeting.service';

@Component({
	selector: 'planner-meetings',
	templateUrl: './meetings.component.html',
	styleUrls: ['./meetings.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent implements OnInit, OnDestroy {
	public headerLevel = HeaderLevel;

	private meetings$ = new Subject<AddMeeting[]>();
	public meetingList$ = this.meetings$.asObservable();

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
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
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Get, DialogPage.Meeting);
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
				this.meetings$.next(meetings);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
