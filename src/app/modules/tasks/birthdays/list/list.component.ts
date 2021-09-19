import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	OnDestroy,
	Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BirthdayService } from '../../../../services/birthday.service';
import { AddBirthday } from '../../../../types/birthday/birthday.types';
import { HeaderLevel } from '../../../../types/header.types';
import { ResponseStatus } from '../../../../types/response.types';

@Component({
	selector: 'task-birthdays-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
	@HostBinding('class') public get hostClasses(): string {
		let hostStyles = [];
		if (this.solarBirthdays.length < 1 || this.lunarBirthdays.length < 1 || this.fullList?.length < 1) {
			hostStyles.push("single-grid");
		}

		return hostStyles.join(" ");
	}

	@Input() set list(list: AddBirthday[]) {
		this.fullList = list;
		this.solarBirthdays = [];
		this.lunarBirthdays = [];

		list?.forEach((birthday: AddBirthday) => {
			if (birthday.lunar) {
				this.lunarBirthdays.push(birthday);
			} else {
				this.solarBirthdays.push(birthday);
			}
		});
	}
	public fullList: AddBirthday[];
	public solarBirthdays: AddBirthday[] = [];
	public lunarBirthdays: AddBirthday[] = [];

	@Output() deletedBirthday = new EventEmitter();

	headerLevel = HeaderLevel;

	public readonly base64Prefix = "data:image/jpeg;base64,";
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private birthdayService: BirthdayService,
	) { }

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

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
