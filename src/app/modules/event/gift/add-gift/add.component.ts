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
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { MaxBudget } from '../../../../constants/gifts.constants';
import { Topic } from '../../../../constants/topics.constants';

import { RecipientList } from '../../../../interfaces/event/recipient.interface';
import { Dialog, DialogAction } from '../../../../interfaces/dialog.interface';
import { GiftAction } from '../../../../interfaces/event/gift.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';

import { RecipientService } from '../../../../services/recipient.service';
import { DialogService } from '../../../../services/dialog.service';
import { LoadingService } from '../../../../services/loading.service';
import { NavService } from '../../../../services/nav.service';
import { ValidationService } from '../../../../services/validation.service';

import { GiftUtils } from '../../../../utils/gift.utils';

@Component({
	selector: 'app-add-gift',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddGiftComponent implements OnInit {
	giftForm: FormGroup;
	giftConfig = GiftUtils.createGiftFormConfig(GiftAction.Add);
	headerLevel = HeaderLevel;

	public submitted = false;
	public maxBudget = MaxBudget;

	private isLoading = false;
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") containerClasses = "section-container";

	constructor(
		private recipientService: RecipientService,
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private loadingService: LoadingService,
		private navService: NavService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.giftForm = this.fb.group({
			recipient: [
				"",
				[
					Validators.required
				],
			],
			occasion: [
				"",
				[
					Validators.required
				]
			],
			year: [
				"",
				[]
			],
			gift: this.fb.group({
				image: [""],
				fileName: [""]
			}),
			description: [
				"",
				[]
			],
			price: [
				"",
				[]
			]
		});

		/*this.route.queryParamMap
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				map((params: ParamMap) => JSON.parse(params.get("recipient")))
			)
			.subscribe((recipient: AddRecipient) => {
				if (recipient?.uuid) {
					this.recipientConfig = RecipientUtils.createRecipientFormConfig(RecipientAction.Edit);
					this.recipient = {
						...this.recipient,
						uuid: recipient?.uuid
					};
					this.populateFormData(recipient);
				}
			});*/

		this.addSubscriptions();
		this.getRecipients();
	}

	private addSubscriptions() {
		this.loadingService.loadingChanged$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((loading: boolean) => {
				this.isLoading = loading;
			});
	}

	public getRecipients(): void {
		this.loadingService.startLoading();
		this.recipientService.getRecipients()
			.pipe(
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((birthdayList: RecipientList) => {
				console.info("🍰 ✅ BirthdaysComponent ---> getRecipients, received birthdays: ", birthdayList);
			});
	}

	/* returns the form controls of the form. */
	get giftFormControl(): { [key: string]: AbstractControl } {
		return this.giftForm.controls;
	}

	onSubmit(): void {
		this.submitted = true;
	}

	onCancel(): void {
		this.dialogService.showConfirmDialog(Dialog.CancelEdit)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: DialogAction) => {
				switch (action) {
					case DialogAction.Continue:
						this.navService.navigateToTopic(Topic.Gifts, { relativeTo: this.route });
						break;
					default:
						break;
				}
			});
	}
}
