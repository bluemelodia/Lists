import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { password } from '../../constants/crypto.constants';
import { Icon } from '../../constants/icons.constants';
import { FormLimit } from '../../constants/gifts.constants';

import { DialogAction, DialogPage } from '../../interfaces/dialog.interface';
import { HeaderLevel } from '../../interfaces/header.interface';
import { ResponseStatus } from '../../interfaces/response.interface';
import { User } from '../../interfaces/user.interface';

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
	public loginForm: FormGroup;
	public limit = FormLimit;
	public showPassword = false;
	public submitted = false;
	private user: User;

	constructor(
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService,
	) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Username.min),
					Validators.maxLength(this.limit.Username.max),
					this.customValidator.usernameValidator(),
				]
			],
			password: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Password.min),
					Validators.maxLength(this.limit.Password.max),
					this.customValidator.passwordValidator(),
				]
			]
		});
	}

	/* returns the form controls of the form. */
	get loginFormControl(): { [key: string]: AbstractControl } {
		return this.loginForm.controls;
	}

	get username(): string {
		return this.loginFormControl.username.value as string;
	}

	get password(): string {
		return this.loginFormControl.password.value as string;
	}

	public onSubmit(): void {
		this.submitted = true;

		if (this.loginForm.valid) {
			this.submitted = false;

			this.user = {
				username: this.username,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
				password: CryptoJS.AES.encrypt(this.password, password).toString()
			}

			this.userService.login(this.user)
				.subscribe((response: ResponseStatus) => {
					if (response === ResponseStatus.ERROR) {
						this.dialogService.showResponseStatusDialog(response, DialogAction.Login, DialogPage.Login);
					} else {
						void this.router.navigate(['/home']);
					}
				});
		}
	}

	public toggleShowPassword(): void {
		this.showPassword = !this.showPassword;
	}
}
