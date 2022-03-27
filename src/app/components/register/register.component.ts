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
				password: CryptoJS.AES.encrypt(this.password, password, {
					format: this.jsonFormatter, mode: CryptoJS.mode.CBC
				}).toString()
			}

			this.userService.createUser(this.user)
				.subscribe((response: ResponseStatus) => {
					this.dialogService.showResponseStatusDialog(response, DialogAction.Register, DialogPage.Register);
				});
		}
	}

	/**
	* Source: https://stackoverflow.com/questions/62442204/use-node-crypto-in-angular-9
	*/
	private get jsonFormatter() {
		return {
			stringify: (cipherParams: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: null, s: null };
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (cipherParams.iv) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
					jsonObj.iv = cipherParams.iv.toString();
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (cipherParams.salt) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
					jsonObj.s = cipherParams.salt.toString();
				}
				return JSON.stringify(jsonObj);
			},
			parse: (jsonStr) => {
				const jsonObj = JSON.parse(jsonStr);
				// extract ciphertext from json object, and create cipher params object
				const cipherParams = CryptoJS.lib.CipherParams.create({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
				});
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (jsonObj.iv) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (jsonObj.s) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
				}
				return cipherParams;
			}
		};
	}
}
