import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	OnDestroy,
	Output
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import { RecipientService } from "../../../../services/recipient.service";
import { CalendarService } from "../../../../services/calendar.service";
import { DialogService } from "../../../../services/dialog.service";

import { Icon } from "../../../../constants/icons.constants";
import { Event } from "../../../../constants/events.contants";

import { ConfirmDialogAction, DialogPage } from "../../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { NO_ITEMS_CONFIG } from "../../../../interfaces/no-items.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";
import { AddRecipient } from "../../../../interfaces/service/service-objects.interface";

@Component({
	selector: "task-birthdays-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnDestroy {
	@HostBinding("class") public get hostClasses(): string {
		let hostStyles = [];
		return hostStyles.join(" ");
	}

	@Input() list: AddRecipient[];
	@Input() header: string;
	@Output() deletedBirthday = new EventEmitter();

	headerLevel = HeaderLevel;
	noItemsConfig = NO_ITEMS_CONFIG[Event.Recipient];

	public icon = Icon;
	public readonly base64Prefix = "data:image/jpeg;base64,";
	public currentYear;
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private recipientService: RecipientService,
		private calendarService: CalendarService,
		private dialogService: DialogService,
		private router: Router,
	) {
		this.currentYear = this.calendarService.year;
	}

	public onDeleteClicked(uuid: string): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Delete, DialogPage.Recipient)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.deleteRecipient(uuid);
						break;
					default:
						break;
				}
			});
	}

	public deleteRecipient(uuid: string): void {
		this.recipientService.deleteRecipient(uuid)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((response: ResponseStatus) => {
				if (response === ResponseStatus.SUCCESS) {
					this.deletedBirthday.emit(null);
				}
			});
	}

	public editBirthday(recipient: AddRecipient): void {
		this.router.navigate(["/events/edit-recipient"], {
			queryParams: { title: 'Edit Recipient', recipient: JSON.stringify(recipient) }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
