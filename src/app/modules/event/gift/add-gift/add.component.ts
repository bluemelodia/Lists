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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MaxBudget } from '../../../../constants/gifts.constants';
import { Topic } from '../../../../constants/topics.constants';

import { Dialog, DialogAction } from '../../../../interfaces/dialog.interface';
import { GiftAction } from '../../../../interfaces/event/gift.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';

import { DialogService } from '../../../../services/dialog.service';
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
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") containerClasses = "section-container";

	constructor(
		private fb: FormBuilder,
		private customValidator: ValidationService,
		private dialogService: DialogService,
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
				map((params: ParamMap) => JSON.parse(params.get("birthday")))
			)
			.subscribe((birthday: AddBirthday) => {
				if (birthday?.uuid) {
					this.birthdayConfig = BirthdayUtils.createBirthdayFormConfig(BirthdayAction.Edit);
					this.birthday = {
						...this.birthday,
						uuid: birthday?.uuid
					};
					this.populateFormData(birthday);
				}
			});*/
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
