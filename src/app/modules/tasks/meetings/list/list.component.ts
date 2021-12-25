import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Event } from '../../../../constants/events.contants';
import { Icon } from '../../../../constants/icons.constants';

import { ConfirmDialogAction, DialogAction, DialogPage } from '../../../../interfaces/dialog.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { NO_ITEMS_CONFIG } from '../../../../interfaces/no-items.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';
import { AddMeeting } from '../../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../../services/dialog.service';
import { EditService } from '../../../../services/edit.service';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
	selector: 'task-meetings-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: AddMeeting[] = [];

	@Output() deletedMeeting = new EventEmitter();

	public headerLevel = HeaderLevel;
	public icon = Icon;
	public noItemsConfig = NO_ITEMS_CONFIG[Event.Meeting];

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private editService: EditService,
		private meetingService: MeetingService,
		private router: Router,
	) { }

	public onDeleteClicked(uuid: string): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Delete, DialogPage.Meeting)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.deleteMeeting(uuid);
						break;
					default:
						break;
				}
			});
	}

	public deleteMeeting(uuid: string): void {
		this.meetingService.deleteMeeting(uuid)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((response: ResponseStatus) => {
				this.dialogService.showResponseStatusDialog(response, DialogAction.Delete, DialogPage.Meeting);

				if (response === ResponseStatus.SUCCESS) {
					this.deletedMeeting.emit(null);
				}
			});
	}

	public editMeeting(meeting: AddMeeting): void {
		this.editService.editMeeting(meeting);
		this.router.navigate(["/events/edit-meeting"], {
			queryParams: { title: 'Edit Meeting', meeting: JSON.stringify(meeting) }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
