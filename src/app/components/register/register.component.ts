import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { password } from '../../constants/crypto.constants';
import { FormLimit } from '../../constants/gifts.constants';
import { Icon } from '../../constants/icons.constants';

import { DialogAction, DialogPage } from '../../interfaces/dialog.interface';
import { HeaderLevel } from '../../interfaces/header.interface';
import { ResponseStatus } from '../../interfaces/response.interface';
import { User } from '../../interfaces/user.interface';

import { DialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'ml-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
	public headerLevel = HeaderLevel;
	public icon = Icon;
	public limit = FormLimit;
	public registerForm: FormGroup;
	public showPassword = false;
	public submitted = false;
	private user: User;

	constructor(
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private userService: UserService,
	) { }

	ngOnInit(): void {
		this.registerForm = this.fb.group({
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
	get registerFormControl(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}

	get username(): string {
		return this.registerFormControl.username.value as string;
	}

	get password(): string {
		return this.registerFormControl.password.value as string;
	}

	public toggleShowPassword(): void {
		this.showPassword = !this.showPassword;
	}

	public onSubmit(): void {
		this.submitted = true;

		if (this.registerForm.valid) {
			this.submitted = false;
			this.user = {
				username: this.username,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
				password: CryptoJS.AES.encrypt(this.password, password).toString()
			}

			this.userService.createUser(this.user)
				.subscribe((response: ResponseStatus) => {
					this.dialogService.showResponseStatusDialog(response, DialogAction.Register, DialogPage.Register);
				});
		}
	}
}
