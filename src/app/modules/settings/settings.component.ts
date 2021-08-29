import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, } from '@angular/forms';
import { Subject } from 'rxjs';
import { Topic } from 'src/app/constants/topics.constants';

import { Phone } from '../../constants/phone.constants';
import { ValidationService } from '../../services/validation.service';
import { HeaderLevel } from '../../types/header.types';
import { Channel, VALIDATE_CHANNEL } from './types/settings.types';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	public channel = Channel;
	public headerLevel = HeaderLevel;
	public settingsForm: FormGroup;
	public topic = Topic;
	public submitted: boolean;
	public validateChannel = VALIDATE_CHANNEL;

	public validateEmail$ = new Subject<boolean>();
	public validatePhone$ = new Subject<boolean>();

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
				}),
				email: [
					'',
				],
				phone: [
					'',
				],
				tasks: this.fb.group({
					[Topic.Career]: this.fb.control(false),
					[Topic.Family]: this.fb.control(false),
					[Topic.Finance]: this.fb.control(false),
					[Topic.Health]: this.fb.control(false),
					[Topic.Social]: this.fb.control(false),
					[Topic.Study]: this.fb.control(false),
					[Topic.Travel]: this.fb.control(false),
				})
			},
			{
				updateOn: 'submit',
				validators: [
					this.customValidator.emailValidator('email', `channels.${Channel.email}`),
					this.customValidator.phoneValidator('phone', `channels.${Channel.text}`)
				]
			},
		);
	}

	/* returns the form controls of the form. */
	get settingsFormControl(): { [key: string]: AbstractControl } {
		return this.settingsForm.controls;
	}

	private get phone(): Phone {
		return this.settingsFormControl.phone.value;
	}

	private get email(): string {
		return this.settingsFormControl.email.value;
	}

	private getChannel(channel: Channel): AbstractControl {
		return this.settingsForm.get(`channels.${channel}`);
	}

	public isChannelChecked(channel: Channel): boolean {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.getChannel(channel)?.value;
	}

	public setChannelValidationStatus(channel: Channel, status: boolean): void {
		this.validateChannel[channel] = status;
	}

	public onSubmit(): void {
		this.submitted = true;
		this.validateEmail$.next(this.validateChannel[Channel.email]);
		this.validatePhone$.next(this.validateChannel[Channel.text]);

		console.log("Errors: ", this.settingsFormControl.email.errors, this.settingsFormControl.phone.errors);
		console.log("Values: ", this.phone, this.email);
	}
}
