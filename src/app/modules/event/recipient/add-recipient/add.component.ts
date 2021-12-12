import { 
	Component, 
	HostBinding,
	Inject,
	OnDestroy,
	OnInit,
} from "@angular/core";
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
import { FormLimit } from "../../../../constants/gifts.constants";

import { RecipientService } from "../../../../services/recipient.service";
import { DialogService } from "../../../../services/dialog.service";
import { NavService } from "../../../../services/nav.service";
import { ValidationService } from "../../../../services/validation.service";

import {
	Address,
	Recipient,
	RecipientAction,
	RecipientID,
	RecipientOptions,
	RecipientProfile,
} from "../../../../interfaces/event/recipient.interface";
import { CalendarType } from "../../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../../interfaces/calendar/calendar-response.interface";
import { Dialog, DialogAction } from "../../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { Phone } from "../../../../interfaces/phone.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";
import { AddRecipient } from "../../../../interfaces/service/service-objects.interface";
import { Channel } from "../../../../interfaces/settings.interface";

import { RecipientUtils } from "../../../../utils/recipient.utils";

@Component({
	selector: "app-add-recipient",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddRecipientComponent implements OnInit, OnDestroy {
	public recipient: Recipient;
	public recipientAction = RecipientAction;
	public recipientForm: FormGroup;
	public recipientConfig = RecipientUtils.createRecipientFormConfig(RecipientAction.Add);
	public recipientID = RecipientID;
	public headerLevel = HeaderLevel;

	public calendarType: CalendarType = CalendarType.Lunar;
	public limit = FormLimit;
	public submitted = false;

	private countries = countries;
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") containerClasses = "section-container";

	constructor(
		private fb: FormBuilder,
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private navService: NavService,
		private recipientService: RecipientService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.recipientForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Name.min),
					Validators.maxLength(this.limit.Name.max),
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
				[RecipientID.call]: this.fb.control(false),
				[RecipientID.text]: this.fb.control(false),
				[RecipientID.gift]: this.fb.control(false),
			}),
			profile: this.fb.group({
				image: [""],
				fileName: [""]
			}),
			budget: [
				"",
				[
					Validators.min(this.limit.Budget.min),
					Validators.max(this.limit.Budget.max)
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
				map((params: ParamMap) => JSON.parse(params.get("recipient")))
			)
			.subscribe((recipient: AddRecipient) => {
				/** Existing recipient. */
				if (recipient?.uuid) {
					this.recipientConfig = RecipientUtils.createRecipientFormConfig(RecipientAction.Edit);
					this.recipient = {
						...this.recipient,
						uuid: recipient?.uuid
					};
					this.populateFormData(recipient);
				}
			});
	}

	private populateFormData(recipient: AddRecipient) {
		console.info("🥳 💾 AddRecipientComponent ---> populateFormData, add existing recipient: ", recipient);
		/**
		 * Don't patch the file name, it opens up security risks.
		 */
		this.recipientForm.patchValue({
			name: recipient.name,
			email: recipient.email,
			phone: recipient.phone,
			address: recipient.address,
			date: {
				day: RecipientUtils.createCalendarDate(recipient),
			},
			options: recipient.options,
			profile: {
				image: recipient.image
			},
			filename: recipient.filename,
			budget: recipient.budget
		});
	}

	/* returns the form controls of the form. */
	get recipientFormControl(): { [key: string]: AbstractControl } {
		return this.recipientForm.controls;
	}

	get name(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.recipientFormControl.name.value;
	}

	get date(): CalendarDay {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.recipientForm.get("date.day")?.value;
	}

	get options(): RecipientOptions {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.recipientFormControl.options.value;
	}

	get profile(): RecipientProfile {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.recipientFormControl.profile.value;
	}

	get email(): string {
		return this.recipientFormControl.email.value;
	}

	get phone(): Phone {
		return this.recipientFormControl.phone.value;
	}

	get address(): Address {
		return this.recipientFormControl.address.value;
	}

	get budget(): number {
		return this.recipientFormControl.budget.value;
	}

	onSubmit(): void {
		this.submitted = true;
		console.log("recipientForm: ", this.recipientForm);

		if (this.recipientForm.valid) {
			this.submitted = false;

			this.recipient = {
				...this.recipient,
				name: this.name,
				date: this.date,
				options: this.options,
				profile: this.profile,
				email: this.email,
				phone: this.phone,
				address: this.address,
				budget: this.budget,
			};
			console.info("🥳 💁🏻‍♀️ AddRecipientComponent ---> onSubmit, recipient: ", this.recipient);

			this.recipientService.modifyRecipient(this.recipient, this.recipientConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.recipientConfig.action) {
						case RecipientAction.Add:
							this.dialogService.showResponseStatusDialog(response, Dialog.AddBirthday);
							break;
						case RecipientAction.Edit:
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
				* Once the user successfully edits the form, take them back to the recipient list.
				*/
				this.navService.navigateToTopic(Topic.Birthdays, { relativeTo: this.route });
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
