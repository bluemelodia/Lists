import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { 
	filter,
	map,
	take,
	takeUntil,
} from 'rxjs/operators';

import { BirthdayAction } from '../../../../constants/birthday.constants';
import { Topic } from '../../../../constants/topics.constants';

import { BirthdayService } from '../../../../services/birthday.service';
import { DialogService } from '../../../../services/dialog.service';
import { NavService } from '../../../../services/nav.service';
import { ValidationService } from '../../../../services/validation.service';

import { AddBirthday, Birthday, BirthdayOptions, BirthdayProfile } from '../../../../types/birthday/birthday.types';
import { CalendarType } from '../../../../types/calendar/calendar.types';
import { CalendarDay } from '../../../../types/calendar/calendar-response.types';
import { Dialog, DialogAction } from '../../../../types/dialog/dialog.types';
import { BirthdayID } from '../../../../types/event.types';
import { HeaderLevel } from '../../../../types/header.types';
import { ResponseStatus } from '../../../../types/response.types';

import { BirthdayUtils } from '../../../../utils/birthday.utils';

@Component({
	selector: 'app-add-birthday',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddBirthdayComponent implements OnInit, OnDestroy {
	birthday: Birthday;
	birthdayAction = BirthdayAction;
	birthdayForm: FormGroup;
	birthdayConfig = BirthdayUtils.createBirthdayFormConfig(BirthdayAction.Add);
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
		private navService: NavService,
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
			}),
			profile: this.fb.group({
				image: [''],
				fileName: ['']
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
					this.birthdayConfig = BirthdayUtils.createBirthdayFormConfig(BirthdayAction.Edit);
					this.birthday = {
						...this.birthday,
						uuid: birthday?.uuid
					};
					this.populateFormData(birthday);
				}
			});
	}


	private populateFormData(birthday: AddBirthday) {
		console.info("🥳 💾 AddBirthdayComponent ---> populateFormData, add existing birthday: ", birthday);
		/**
		 * Don't patch the file name, it opens up security risks.
		 */
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
			},
			profile: {
				image: birthday.image
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

	get date(): CalendarDay {
		return this.birthdayForm.get('date.birthday')?.value;
	}

	get options(): BirthdayOptions {
		return this.birthdayFormControl.options.value;
	}

	get profile(): BirthdayProfile {
		return this.birthdayFormControl.profile.value;
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.birthdayForm.valid) {
			this.submitted = false;

			this.birthday = {
				...this.birthday,
				name: this.name,
				date: this.date,
				options: this.options,
				profile: this.profile,
			};
			console.info("🥳 💁🏻‍♀️ AddBirthdayComponent ---> onSubmit, birthday: ", this.birthday);

			this.birthdayService.modifyBirthday(this.birthday, this.birthdayConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch(this.birthdayConfig.action) {
					case BirthdayAction.Add:
						this.dialogService.showResponseStatusDialog(response, Dialog.AddBirthday);
						break;
					case BirthdayAction.Edit:
						this.dialogService.showResponseStatusDialog(response, Dialog.EditBirthday);
						break;
					}

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	onCancel(): void {		
		this.dialogService.showConfirmDialog(Dialog.CancelEdit)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: DialogAction) => {
				switch(action) {
				case DialogAction.Continue:
					this.navService.navigateToTopic(Topic.Birthdays, { relativeTo: this.route });
					break;
				default:
					break;
				}
			});
	}

	subscribeToDialogClose(): void {
		this.dialogService.onDialogAction$
			.pipe(
				filter((action: DialogAction) => action === DialogAction.Close),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				this.birthdayForm.reset();

				/**
				* Once the user successfully edits the form, take them back to the birthday list.
				*/
				if (this.birthdayConfig.action === BirthdayAction.Edit) {
					this.navService.navigateToTopic(Topic.Birthdays, { relativeTo: this.route });
				}
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
