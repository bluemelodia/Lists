import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { 
	map,
	take,
	takeUntil,
} from 'rxjs/operators';


import { BirthdayService } from '../../../../services/birthday.service';
import { DialogService } from '../../../../services/dialog.service';
import { ValidationService } from '../../../../services/validation.service';

import { AddBirthday, BirthdayOptions } from '../../../../types/birthday/birthday.types';
import { CalendarType } from '../../../../types/calendar/calendar.types';
import { SelectedDay } from '../../../../types/calendar/calendar-response.types';
import { Dialog } from '../../../../types/dialog/dialog.types';
import { BirthdayID } from '../../../../types/event.types';
import { HeaderLevel } from '../../../../types/header.types';
import { ResponseStatus } from '../../../../types/response.types';
import { BirthdayUtils } from 'src/app/utils/birthday.utils';

@Component({
	selector: 'app-add-birthday',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddBirthdayComponent implements OnInit {
	birthdayForm: FormGroup;
	birthdayAction = 'Add';
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
		private route: ActivatedRoute,
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

		this.route.queryParamMap
			.pipe(
				map((params: ParamMap) => JSON.parse(params.get("birthday")))
			)
			.subscribe((birthday: AddBirthday) => {
				/** Existing birthday. */
				if (birthday?.uuid) {
					this.birthdayAction = 'Edit';
					this.populateFormData(birthday);
				}
			});
	}


	private populateFormData(birthday: AddBirthday) {
		this.birthdayForm.patchValue({
			name: birthday.name,
			date: {
				birthday: BirthdayUtils.createCalendarDate(birthday),
			},
			options: {
				lunar: BirthdayUtils.createCheckboxOption(birthday.lunar),
				[BirthdayID.call]: BirthdayUtils.createCheckboxOption(birthday.call),
				[BirthdayID.text]: BirthdayUtils.createCheckboxOption(birthday.text),
				[BirthdayID.gift]: BirthdayUtils.createCheckboxOption(birthday.gift),
			}
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
