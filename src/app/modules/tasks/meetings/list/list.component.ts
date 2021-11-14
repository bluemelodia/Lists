import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/interfaces/response.interface';

import { Event } from '../../../../constants/events.contants';
import { Icon } from '../../../../constants/icons.constants';

import { Dialog, DialogAction } from '../../../../interfaces/dialog.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { NO_ITEMS_CONFIG } from '../../../../interfaces/no-items.interface';
import { AddMeeting } from '../../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../../services/dialog.service';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
	selector: 'task-meetings-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	@Input() list: AddMeeting[] = [];
	@Output() deletedMeeting = new EventEmitter();

	headerLevel = HeaderLevel;
	noItemsConfig = NO_ITEMS_CONFIG[Event.Meeting];
	public icon = Icon;

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private meetingService: MeetingService,
		private router: Router,
	) { }

	ngOnInit(): void {
	}

	public onDeleteClicked(uuid: string): void {
		this.dialogService.showConfirmDialog(Dialog.DeleteMeeting)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: DialogAction) => {
				switch (action) {
					case DialogAction.Continue:
						this.deleteMeeting(uuid);
						break;
					default:
						break;
				}
			});
	}

	public deleteMeeting(uuid: string) {
		this.meetingService.deleteMeeting(uuid)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((response: ResponseStatus) => {
				if (response === ResponseStatus.SUCCESS) {
					this.deletedMeeting.emit(null);
				}
			});
	}

	public editMeeting(meeting: AddMeeting) {
		this.router.navigate(["/events/edit-meeting"], {
			queryParams: { title: 'Edit Meeting', meeting: JSON.stringify(meeting) }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
