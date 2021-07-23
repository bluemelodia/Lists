import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { 
	take,
	takeUntil,
} from 'rxjs/operators';

import { BirthdayOptions } from '../../../types/birthday/birthday.types';
import { CalendarType } from '../../../types/calendar/calendar.types';
import { SelectedDay } from '../../../types/calendar/calendar-response.types';
import { Dialog } from '../../../types/dialog/dialog.types';
import { BirthdayID } from '../../../types/event.types';
import { HeaderLevel } from '../../../types/header.types';
import { ResponseStatus } from '../../../types/response.types';

import { BirthdayService } from '../../../services/birthday.service';
import { DialogService } from '../../../services/dialog.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
	selector: 'app-add-birthday',
	templateUrl: './add-birthday.component.html',
	styleUrls: ['./add-birthday.component.css']
})
export class AddBirthdayComponent implements OnInit {
	birthdayForm: FormGroup;
	birthdayID = BirthdayID;
	headerLevel = HeaderLevel;

	public calendarType: CalendarType = CalendarType.Lunar;
	public submitted = false;

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private fb: FormBuilder,
		private dialogService: DialogService,
		private birthdayService: BirthdayService,
		private customValidator: ValidationService,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.birthdayForm = this.fb.group({
			name: [
				'', 
				[
					Validators.required,
					Validators.minLength(5),
					this.customValidator.nameValidator()
				],
			],
			date: this.fb.group({
				birthday: ['', [Validators.required]],
			}),
			options: this.fb.group({
				lunar: this.fb.control(false),
				[BirthdayID.call]: this.fb.control(false),
				[BirthdayID.text]: this.fb.control(false),
				[BirthdayID.gift]: this.fb.control(false),
			})
		},
		{ 
			updateOn: 'submit'
		});
	}

	/* returns the form controls of the form. */
	get birthdayFormControl() {
		return this.birthdayForm.controls;
	}

	get name(): string {
		return this.birthdayFormControl.name.value;
	}

	get date(): SelectedDay {
		return this.birthdayForm.get('date.birthday')?.value;
	}

	get options(): BirthdayOptions {
		return this.birthdayFormControl.options.value;
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.birthdayForm.valid) {
			this.submitted = false;
			this.birthdayService.addBirthday({
				name: this.name,
				date: this.date,
				options: this.options,
			})
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					console.log("===> add birthday results: ", response);
					this.dialogService.showStatusDialog(response, Dialog.AddBirthday);

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	subscribeToDialogClose(): void {
		this.dialogService.onDialogClose$
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				this.birthdayForm.reset();
			});
	}
}
