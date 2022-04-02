import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, } from "@angular/forms";
import { Subject } from "rxjs";
import { finalize, take, takeUntil } from "rxjs/operators";

import { Topic } from "../../constants/topics.constants";

import { DialogAction, DialogPage } from "../../interfaces/dialog.interface";
import { HeaderLevel } from "../../interfaces/header.interface";
import { Phone } from "../../interfaces/phone.interface";
import { ResponseStatus } from "../../interfaces/response.interface";
import {
	Settings,
	TopicSettings,
} from "./interfaces/settings.interface";
import { Channel, VALIDATE_CHANNEL } from "../../interfaces/settings.interface";

import { DialogService } from "../../services/dialog.service";
import { LoadingService } from "../../services/loading.service";
import { SettingsService } from "./services/settings.service";
import { ValidationService } from "../../services/validation.service";

@Component({
	selector: "ml-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
	public channel = Channel;
	public headerLevel = HeaderLevel;
	public settingsForm: FormGroup;
	public submitted: boolean;
	public topic = Topic;
	public validateChannel = VALIDATE_CHANNEL;

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private customValidator: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private loadingService: LoadingService,
		private settingsService: SettingsService,
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
					"",
				],
				phone: this.fb.group({
					countryCode: [""],
					number: [""],
				}),
				tasks: this.fb.group({
					[Topic.Birthdays]: this.fb.control(false),
					[Topic.Meetings]: this.fb.control(false),
					[Topic.Tasks]:this.fb.control(false),
				})
			},
			{
				updateOn: "submit",
				validators: [
					this.customValidator.emailValidator("email", `channels.${Channel.email}`),
					this.customValidator.phoneValidator("phone", `channels.${Channel.text}`)
				]
			},
		);
		this.loadSettings();
	}

	private loadSettings(): void {
		this.loadingService.startLoading();
		this.settingsService.loadSettings()
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$),
				finalize(() => {
					this.loadingService.stopLoading();
				})
			)
			.subscribe((settings: Settings) => {
				console.info("[Settings] Populate form data: ", settings);
				this.settingsForm.patchValue({
					channels: {
						[Channel.email]: !!settings?.email,
						[Channel.text]: !!settings?.phone,
					},
					email: settings?.email,
					phone: {
						countryCode: settings?.country,
						number: settings?.phone
					},
					tasks: {
						...settings?.tasks
					}
				});

				this.setChannelValidationStatus(Channel.email, !!settings?.email);
				this.setChannelValidationStatus(Channel.text, !!settings?.phone);

				this.cdRef.detectChanges();
			});
	}

	/* returns the form controls of the form. */
	get settingsFormControl(): { [key: string]: AbstractControl } {
		return this.settingsForm.controls;
	}

	private get phone(): Phone {
		return this.settingsFormControl.phone.value as Phone;
	}

	private get email(): string {
		return this.settingsFormControl.email.value as string;
	}

	private get tasks(): TopicSettings {
		return this.settingsFormControl.tasks.value as TopicSettings;
	}

	private getChannel(channel: Channel): AbstractControl {
		return this.settingsForm.get(`channels.${channel}`);
	}

	public isChannelChecked(channel: Channel): boolean {
		return this.getChannel(channel)?.value as boolean;
	}

	public setChannelValidationStatus(channel: Channel, status: boolean): void {
		this.validateChannel[channel] = status;
	}

	public onSubmit(): void {
		this.submitted = true;

		if (!this.settingsFormControl.email.errors && !this.settingsFormControl.phone.errors) {
			this.submitted = false;
			const settings: Settings = {
				country: this.phone?.countryCode,
				email: this.isChannelChecked(Channel.email) ? this.email : null,
				phone: this.isChannelChecked(Channel.text) ? this.phone?.number : null,
				tasks: this.tasks,
			}
			this.loadingService.startLoading();
			this.settingsService.saveSettings(settings)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$),
					finalize(() => {
						this.loadingService.stopLoading();
					})
				)
				.subscribe((responseStatus: ResponseStatus) => {
					switch (responseStatus) {
						case ResponseStatus.SUCCESS:
							this.dialogService.showResponseStatusDialog(responseStatus, DialogAction.Save, DialogPage.Settings);
							break;
						case ResponseStatus.ERROR:
							this.dialogService.showResponseStatusDialog(responseStatus, DialogAction.Save, DialogPage.Settings);
							break;
					}

					this.loadSettings();
				});
		}
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
