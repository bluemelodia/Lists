import {
	Component,
	HostBinding,
	OnInit,
} from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	ActivatedRoute,
	NavigationStart,
	Router,
} from '@angular/router';

import { of, Subject } from 'rxjs';
import {
	catchError,
	filter,
	finalize,
	take,
	takeUntil,
} from 'rxjs/operators';

import { FormLimit } from '../../../../constants/gifts.constants';
import { Occasion } from '../../../../constants/occasions.constants';
import { Topic } from '../../../../constants/topics.constants';

import { ConfirmDialogAction, DialogAction, DialogPage } from '../../../../interfaces/dialog.interface';
import { RecipientList } from '../../../../interfaces/event/recipient.interface';
import { EventImage } from '../../../../interfaces/event/event.interface';
import { AddGift, GiftAction } from '../../../../interfaces/event/gift.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';
import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../../services/dialog.service';
import { EditService } from '../../../../services/edit.service';
import { GiftService } from '../../../../services/gift.service';
import { LoadingService } from '../../../../services/loading.service';
import { NavService } from '../../../../services/nav.service';
import { RecipientService } from '../../../../services/recipient.service';

import { GiftUtils } from '../../../../utils/gift.utils';

@Component({
	selector: 'app-add-gift',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddGiftComponent implements OnInit {
	public giftForm: FormGroup;
	public giftConfig = GiftUtils.createGiftFormConfig(GiftAction.Add);
	public headerLevel = HeaderLevel;
	public limit = FormLimit;
	public submitted = false;

	private recipients$ = new Subject<AddRecipient[]>();
	public recipientList$ = this.recipients$.asObservable();

	private gift: AddGift;
	private isLoading = false;
	private recipientList: AddRecipient[];
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [
			"section-container"
		];

		if (this.isLoading) {
			hostStyles.push("hide-container");
		}

		return hostStyles.join(" ");
	}

	constructor(
		private dialogService: DialogService,
		private editService: EditService,
		private fb: FormBuilder,
		private giftService: GiftService,
		private loadingService: LoadingService,
		private navService: NavService,
		private recipientService: RecipientService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.giftForm = this.fb.group({
			recipients: this.fb.group({
				giftRecipient: ["", [Validators.required]],
			}),
			occasions: this.fb.group({
				giftOccasion: ["", [Validators.required]],
			}),
			year: [
				"",
				[
					Validators.required,
					Validators.min(this.limit.Year.min),
					Validators.max(this.limit.Year.max),
				]
			],
			gift: this.fb.group({
				image: [""],
				fileName: [""]
			}),
			description: [
				"",
				[
					Validators.maxLength(this.limit.Description.max)
				]
			],
			price: [
				"",
				[
					Validators.min(this.limit.Budget.min),
					Validators.max(this.limit.Budget.max)
				]
			]
		},
			{
				updateOn: "submit",
				validators: []
			});;

		this.router.events
			.pipe(
				filter(event => event instanceof NavigationStart)
			)
			.subscribe((event: NavigationStart) => {
				console.info("[Add Gift] Routed to: ", event.url);

				if (event.url.includes('/events/add-gift')) {
					this.editService.clearItem(Topic.Gifts);
				}
			});

		const gift = this.editService.getItem(Topic.Gifts) as AddGift;
		if (gift) {
			if (gift?.uuid) {
				this.giftConfig = GiftUtils.createGiftFormConfig(GiftAction.Edit);
				this.gift = {
					...gift,
					uuid: gift?.uuid
				};
				this.populateFormData(gift);
			}
		}

		this.addSubscriptions();
		this.getRecipients();
	}

	private addSubscriptions(): void {
		this.loadingService.loadingChanged$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((loading: boolean) => {
				this.isLoading = loading;
			});
	}

	private populateFormData(gift: AddGift): void {
		/**
		* Don't patch the file name, it opens up security risks.
		*/
		console.info("[Add Gifts] Populate form data: ", gift);
		this.giftForm.patchValue({
			occasions: {
				giftOccasion: gift.occasion
			},
			year: gift.year,
			gift: {
				image: gift.image
			},
			description: gift.description,
			price: gift.price
		});

		if (!this.recipientList) {
			this.getRecipients();
		}
	}

	public getRecipients(): void {
		this.loadingService.startLoading();
		this.recipientService.getRecipients()
			.pipe(
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Get, DialogPage.Gift);
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((recipientList: RecipientList) => {
				console.info("[Add Gifts] Received recipients: ", recipientList);
				this.recipients$.next(recipientList.list);
				this.recipientList = recipientList.list;

				if (this.giftConfig.action === GiftAction.Edit) {
					this.patchRecipient();
				}
			});
	}

	private patchRecipient(): void {
		this.recipientList.filter((recipient: AddRecipient) => {
			if (recipient.uuid === this.gift.recipientId) {
				this.giftForm.patchValue({
					recipients: {
						giftRecipient: recipient
					}
				});
			}
		});
	}

	/* returns the form controls of the form. */
	get giftFormControl(): { [key: string]: AbstractControl } {
		return this.giftForm.controls;
	}

	get recipient(): AddRecipient {
		return this.giftForm.get('recipients.giftRecipient').value;
	}

	get occasion(): Occasion {
		return this.giftForm.get('occasions.giftOccasion').value;
	}

	get year(): number {
		return this.giftFormControl.year.value;
	}

	get giftImage(): EventImage {
		return this.giftFormControl.gift.value;
	}

	get description(): string {
		return this.giftFormControl.description.value;
	}

	get price(): number {
		return this.giftFormControl.price.value;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.giftForm.valid) {
			this.submitted = false;

			this.gift = {
				...this.gift,
				recipientId: this.recipient.uuid,
				occasion: this.occasion,
				year: this.year,
				giftImage: this.giftImage,
				description: this.description,
				price: this.price,
			}
			console.info("[Add Gifts] Submit gift: ", this.gift);

			this.giftService.modifyGift(this.gift, this.giftConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.giftConfig.action) {
						case GiftAction.Add:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Add, DialogPage.Gift);
							break;
						case GiftAction.Edit:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Edit, DialogPage.Gift);
							break;
					}

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	onCancel(): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Cancel, DialogPage.Gift)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.navService.navigateToTopic(Topic.Gifts, { relativeTo: this.route });
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
				* Once the user successfully edits the form, take them back to the meeting list.
				*/
				this.navService.navigateToTopic(Topic.Gifts, { relativeTo: this.route });
			});
	}
}
