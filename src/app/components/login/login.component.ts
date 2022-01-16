import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormLimit } from '../../constants/gifts.constants';
import { HeaderLevel } from '../../interfaces/header.interface';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public headerLevel = HeaderLevel;
	public loginForm: FormGroup;
	public limit = FormLimit;
	public submitted = false;

	constructor(
		private customValidator: ValidationService,
		private fb: FormBuilder,
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
		}
	}
}
