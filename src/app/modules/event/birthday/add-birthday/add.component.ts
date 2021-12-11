import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subject } from "rxjs";
import {
	filter,
	map,
	take,
	takeUntil,
} from "rxjs/operators";

import { Topic } from "../../../../constants/topics.constants";
import { countries } from "../../../../constants/countries.constants";

import { BirthdayService } from "../../../../services/birthday.service";
import { DialogService } from "../../../../services/dialog.service";
import { NavService } from "../../../../services/nav.service";
import { ValidationService } from "../../../../services/validation.service";

import {
	Address,
	Birthday,
	BirthdayAction,
	BirthdayID,
	BirthdayOptions,
	BirthdayProfile,
} from "../../../../interfaces/birthday.interface";
import { MaxBudget } from "../../../../constants/gifts.constants";

import { CalendarType } from "../../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../../interfaces/calendar/calendar-response.interface";
import { Dialog, DialogAction } from "../../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { Phone } from "../../../../interfaces/phone.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";
import { AddBirthday } from "../../../../interfaces/service/service-objects.interface";
import { Channel } from "../../../../interfaces/settings.interface";

import { BirthdayUtils } from "../../../../utils/birthday.utils";
import { FormUtils } from "../../../../utils/form.utils";

@Component({
	selector: "app-add-birthday",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddBirthdayComponent implements OnInit, OnDestroy {
	birthday: Birthday;
	birthdayAction = BirthdayAction;
	birthdayForm: FormGroup;
	birthdayConfig = BirthdayUtils.createBirthdayFormConfig(BirthdayAction.Add);
	birthdayID = BirthdayID;
	headerLevel = HeaderLevel;

	public calendarType: CalendarType = CalendarType.Lunar;
	public maxBudget = MaxBudget;
	public submitted = false;

	private countries = countries;
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") containerClasses = "section-container";

	constructor(
		private fb: FormBuilder,
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private birthdayService: BirthdayService,
		private navService: NavService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.birthdayForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(1),
					this.customValidator.nameValidator()
				],
			],
			email: [
				"",
			],
			phone: this.fb.group({
				countryCode: [""],
				number: [""],
			}),
			address: this.fb.group({
				street: [""],
				unit: [""],
				city: [""],
				state: [""],
				zip: [""],
				country: this.fb.group({
					name: [this.countries["US"].name],
					code: [this.countries["US"].code]
				}),
			}),
			date: this.fb.group({
				day: ["", [Validators.required]],
			}),
			options: this.fb.group({
				lunar: this.fb.control(false),
				[BirthdayID.call]: this.fb.control(false),
				[BirthdayID.text]: this.fb.control(false),
				[BirthdayID.gift]: this.fb.control(false),
			}),
			profile: this.fb.group({
				image: [""],
				fileName: [""]
			}),
			budget: [
				"",
				[
					Validators.min(0),
					Validators.max(this.maxBudget)
				]
			],
		},
			{
				updateOn: "submit",
				validators: [
					this.customValidator.emailValidator("email", `channels.${Channel.email}`),
					this.customValidator.phoneValidator("phone", `channels.${Channel.text}`),
					this.customValidator.addressValidator("address"),
				]
			});

		this.route.queryParamMap
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
			email: birthday.email,
			phone: birthday.phone,
			address: birthday.address,
			date: {
				day: BirthdayUtils.createCalendarDate(birthday),
			},
			options: birthday.options,
			profile: {
				image: birthday.image
			},
			filename: birthday.filename,
			budget: birthday.budget
		});
	}

	/* returns the form controls of the form. */
	get birthdayFormControl(): { [key: string]: AbstractControl } {
		return this.birthdayForm.controls;
	}

	get name(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.birthdayFormControl.name.value;
	}

	get date(): CalendarDay {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.birthdayForm.get("date.day")?.value;
	}

	get options(): BirthdayOptions {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.birthdayFormControl.options.value;
	}

	get profile(): BirthdayProfile {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.birthdayFormControl.profile.value;
	}

	get email(): string {
		return this.birthdayFormControl.email.value;
	}

	get phone(): Phone {
		return this.birthdayFormControl.phone.value;
	}

	get address(): Address {
		return this.birthdayFormControl.address.value;
	}

	get budget(): number {
		return this.birthdayFormControl.budget.value;
	}

	onSubmit(): void {
		this.submitted = true;
		console.log("birthdayForm: ", this.birthdayForm);

		if (this.birthdayForm.valid) {
			this.submitted = false;

			this.birthday = {
				...this.birthday,
				name: this.name,
				date: this.date,
				options: this.options,
				profile: this.profile,
				email: this.email,
				phone: this.phone,
				address: this.address,
				budget: this.budget,
			};
			console.info("🥳 💁🏻‍♀️ AddBirthdayComponent ---> onSubmit, birthday: ", this.birthday);

			this.birthdayService.modifyBirthday(this.birthday, this.birthdayConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.birthdayConfig.action) {
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
				switch (action) {
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
				/**
				* Once the user successfully edits the form, take them back to the birthday list.
				*/
				this.navService.navigateToTopic(Topic.Birthdays, { relativeTo: this.route });
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
