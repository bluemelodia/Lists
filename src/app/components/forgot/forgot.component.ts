import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Icon } from '../../constants/icons.constants';
import { FormLimit } from '../../constants/gifts.constants';

import { DialogAction, DialogPage } from '../../interfaces/dialog.interface';
import { HeaderLevel } from '../../interfaces/header.interface';
import { ResponseStatus } from '../../interfaces/response.interface';

import { DialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'ml-forgot',
	templateUrl: './forgot.component.html',
	styleUrls: ['./forgot.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent implements OnInit {
	public headerLevel = HeaderLevel;
	public icon = Icon;
	public forgotForm: FormGroup;
	public limit = FormLimit;
	public submitted = false;

	constructor(
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService,
	) { }

	ngOnInit(): void {
		this.forgotForm = this.fb.group({
			username: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Username.min),
					Validators.maxLength(this.limit.Username.max),
					this.customValidator.usernameValidator(),
				]
			]
		});
	}

	/* returns the form controls of the form. */
	get forgotFormControl(): { [key: string]: AbstractControl } {
		return this.forgotForm.controls;
	}

	get username(): string {
		return this.forgotFormControl.username.value as string;
	}

	public onSubmit(): void {
		this.submitted = true;

		if (this.forgotForm.valid) {
			this.submitted = false;

			this.userService.forgotPassword(this.username)
				.subscribe((response: ResponseStatus) => {
					if (response === ResponseStatus.ERROR) {
						this.dialogService.showResponseStatusDialog(response, DialogAction.Forgot, DialogPage.Forgot);
					} else {
						void this.router.navigate(['/home']);
					}
				});
		}
	}
}
