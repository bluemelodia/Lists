import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { ValidationService } from '../../services/validation.service';
import { HeaderLevel } from '../../types/header.types';
import { Channel } from './types/settings.types';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	public channel = Channel;
	public headerLevel = HeaderLevel;
	public settingsForm: FormGroup;
	public submitted = false;

	constructor(
		private customValidator: ValidationService,
		private fb: FormBuilder,
	) { }

	ngOnInit(): void {
				/* Set the controls for the form. */
		this.settingsForm = this.fb.group(
			{
				channels: this.fb.group({
					[Channel.email]: this.fb.control(false),
					[Channel.text]: this.fb.control(false),
					[Channel.notification]: this.fb.control(false),
				}),
				email: [
					'',
				]
			},
			{
				validator: this.customValidator.emailValidator('email', `channels.${Channel.email}`),
				updateOn: 'submit',
			},
		);
	}

	/* returns the form controls of the form. */
	get settingsFormControl() {
		return this.settingsForm.controls;
	}

	private getChannel(channel: Channel): AbstractControl {
		return this.settingsForm.get(`channels.${channel}`);
	}

	public isChannelChecked(channel: Channel): boolean {
		return this.getChannel(channel)?.value;
	}

	public onSubmit(): void {
		this.submitted = true;
		console.log("Errors: ", this.settingsFormControl.email.errors);
	}
}
