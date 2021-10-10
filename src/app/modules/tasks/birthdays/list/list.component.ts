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
import { AddBirthday } from '../../../../interfaces/birthday.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';

@Component({
	selector: 'task-birthdays-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
	@HostBinding('class') public get hostClasses(): string {
		let hostStyles = [];
		return hostStyles.join(" ");
	}

	@Input() list: AddBirthday[];
	@Input() header: string;
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
