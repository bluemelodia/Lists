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

import { BirthdayService } from "../../../../services/birthday.service";
import { DialogService } from "../../../../services/dialog.service";

import { Icon } from "../../../../constants/icons.constants";
import { Event } from "../../../../constants/events.contants";

import { Dialog, DialogAction } from "../../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { NO_ITEMS_CONFIG } from "../../../../interfaces/no-items.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";
import { AddBirthday } from "../../../../interfaces/service/service-objects.interface";

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

	@Input() list: AddBirthday[];
	@Input() header: string;
	@Output() deletedBirthday = new EventEmitter();

	headerLevel = HeaderLevel;
	noItemsConfig = NO_ITEMS_CONFIG[Event.Birthday];

	public icon = Icon;
	public readonly base64Prefix = "data:image/jpeg;base64,";
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private birthdayService: BirthdayService,
		private dialogService: DialogService,
		private router: Router,
	) { }

	public onDeleteClicked(uuid: string): void {
		this.dialogService.showConfirmDialog(Dialog.DeleteBirthday)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: DialogAction) => {
				switch (action) {
					case DialogAction.Continue:
						this.deleteBirthday(uuid);
						break;
					default:
						break;
				}
			});
	}

	public deleteBirthday(uuid: string): void {
		this.birthdayService.deleteBirthday(uuid)
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

	public editBirthday(birthday: AddBirthday): void {
		this.router.navigate(["/events/edit-birthday"], {
			queryParams: { title: 'Edit Birthday', birthday: JSON.stringify(birthday) }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
