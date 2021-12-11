import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HeaderLevel } from '../../../../interfaces/header.interface';

import { DialogService } from '../../../../services/dialog.service';
import { NavService } from '../../../../services/nav.service';
import { ValidationService } from '../../../../services/validation.service';

@Component({
	selector: 'app-add-gift',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddGiftComponent implements OnInit {
	giftForm: FormGroup;
	headerLevel = HeaderLevel;

	public submitted = false;

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
					[
						Validators.required
					]
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

	}
}
