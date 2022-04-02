import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit,
} from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import {
	ActivatedRoute,
	Router,
} from '@angular/router';
import { Subject } from "rxjs";
import {
	filter,
	take,
	takeUntil,
} from "rxjs/operators";

import { countries } from "../../../constants/countries.constants";
import { FormLimit } from "../../../constants/gifts.constants";
import { Topic } from "../../../constants/topics.constants";

import { CalendarType } from "../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../interfaces/calendar/calendar-response.interface";
import { ConfirmDialogAction, DialogAction, DialogPage } from "../../../interfaces/dialog.interface";
import { EventImage } from "../../../interfaces/event/event.interface";
import {
	Address,
	RecipientAction,
	RecipientID,
	RecipientOptions,
} from "../../../interfaces/event/recipient.interface";
import { HeaderLevel } from "../../../interfaces/header.interface";
import { Phone } from "../../../interfaces/phone.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";
import { AddRecipient } from "../../../interfaces/service/service-objects.interface";
import { Channel } from "../../../interfaces/settings.interface";

import { DialogService } from "../../../services/dialog.service";
import { EditService } from "../../../services/edit.service";
import { NavService } from "../../../services/nav.service";
import { RecipientService } from "../../../services/recipient.service";
import { ValidationService } from "../../../services/validation.service";

import { RecipientUtils } from "../../../utils/recipient.utils";

@Component({
	selector: "ml-add-recipient",
	templateUrl: "./add-recipient.component.html",
	styleUrls: ["./add-recipient.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipientComponent implements OnInit, OnDestroy {
	@HostBinding("class") containerClasses = "ml-section-container ";

	public calendarType = CalendarType;
	public headerLevel = HeaderLevel;
	public limit = FormLimit;
	public recipient: AddRecipient;
	public recipientAction = RecipientAction;
	public recipientConfig = RecipientUtils.createRecipientFormConfig(RecipientAction.Add);
	public recipientForm: FormGroup;
	public recipientID = RecipientID;
	public submitted = false;
	public topic = Topic.Birthdays;

	private countries = countries;
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private editService: EditService,
		private fb: FormBuilder,
		private navService: NavService,
		private recipientService: RecipientService,
		private route: ActivatedRoute,
		private router: Router,
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

		console.info("[Add Recipient] Routed to: ", this.router.url);
		if (this.router.url.includes('events/add-recipient')) {
			this.editService.clearItem(Topic.Birthdays);
		} else {
			/** Existing recipient. */
			const recipient = this.editService.getItem(Topic.Birthdays) as AddRecipient;
			if (recipient?.uuid) {
				console.info("[Add Recipient] Repopulate form data: ", this.recipient);
				this.recipientConfig = RecipientUtils.createRecipientFormConfig(RecipientAction.Edit);
				this.recipient = recipient;
				this.populateFormData(recipient);
			}
		}
	}

	private populateFormData(recipient: AddRecipient): void {
		console.info("[Add Recipient] Populate form data: ", recipient);
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
		return this.recipientFormControl.name.value as string;
	}

	get date(): CalendarDay {
		return this.recipientForm.get("date.day")?.value as CalendarDay;
	}

	get options(): RecipientOptions {
		return this.recipientFormControl.options.value as RecipientOptions;
	}

	get profile(): EventImage {
		return this.recipientFormControl.profile.value as EventImage;
	}

	get email(): string {
		return this.recipientFormControl.email.value as string;
	}

	get phone(): Phone {
		return this.recipientFormControl.phone.value as Phone;
	}

	get address(): Address {
		return this.recipientFormControl.address.value as Address;
	}

	get budget(): number {
		return this.recipientFormControl.budget.value as number;
	}

	onSubmit(): void {
		this.submitted = true;

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
			console.info("[Add Recipient] Submit recipient: ", this.recipientForm);

			this.recipientService.modifyRecipient(this.recipient, this.recipientConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.recipientConfig.action) {
						case RecipientAction.Add:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Add, DialogPage.Recipient);
							break;
						case RecipientAction.Edit:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Edit, DialogPage.Recipient);
							break;
					}

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	onCancel(): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Cancel, DialogPage.Recipient)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.navService.navigateToTopic(Topic.Birthdays, { relativeTo: this.route });
						break;
					default:
						break;
				}
			});
	}

	subscribeToDialogClose(): void {
		this.dialogService.onConfirmDialogAction$
			.pipe(
				filter((action: ConfirmDialogAction) => action === ConfirmDialogAction.Close),
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
