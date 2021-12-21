import { Component, HostBinding, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subject } from "rxjs";
import {
	filter,
	map,
	take,
	takeUntil,
} from "rxjs/operators";

import { FormLimit } from "../../../../constants/gifts.constants";
import { Topic } from "../../../../constants/topics.constants";
import { CalendarType } from "../../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../../interfaces/calendar/calendar-response.interface";
import { ConfirmDialogAction, DialogAction, DialogPage } from "../../../../interfaces/dialog.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import {
	Meeting,
	MeetingAction,
} from "../../../../interfaces/event/meeting.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";
import { AddMeeting } from "../../../../interfaces/service/service-objects.interface";

import { appTheme } from "../../../form/timepicker/time-picker.constants";
import { DialogService } from "../../../../services/dialog.service";
import { MeetingService } from "../../../../services/meeting.service";
import { NavService } from "../../../../services/nav.service";
import { ValidationService } from "../../../../services/validation.service";
import { MeetingUtils } from "../../../../utils/meeting.utils";

@Component({
	selector: "app-add-meeting",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddMeetingComponent implements OnInit {
	public limit = FormLimit;
	public meeting: Meeting;
	public meetingAction = MeetingAction;
	public meetingConfig = MeetingUtils.createMeetingFormConfig(MeetingAction.Add);
	public meetingForm: FormGroup;

	public calendarType: CalendarType = CalendarType.Solar;
	public headerLevel = HeaderLevel;
	public submitted = false;
	public timePickerTheme = appTheme;

	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") containerClasses = "section-container";

	constructor(
		private customValidators: ValidationService,
		private dialogService: DialogService,
		private fb: FormBuilder,
		private meetingService: MeetingService,
		private navService: NavService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.meetingForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Name.min),
					Validators.maxLength(this.limit.Name.max),
				],
			],
			startDate: this.fb.group({
				day: ["", [Validators.required]],
			}),
			endDate: this.fb.group({
				day: ["", [Validators.required]],
			}),
			startTime: [
				""
			],
			endTime: [
				""
			],
			description: [
				"",
				[
					Validators.maxLength(this.limit.Description.max),
				]
			],
			location: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Location.min),
					Validators.maxLength(this.limit.Location.max),
				]
			],
			options: this.fb.group({
				virtual: this.fb.control(false),
			}),
		},
			{
				updateOn: "submit",
				validators: [
					this.customValidators.dateAndTimeValidator("startDate.day", "endDate.day", "startTime", "endTime")
				]
			});

		this.route.queryParamMap
			.pipe(
				map((params: ParamMap) => JSON.parse(params.get("meeting")))
			)
			.subscribe((meeting: AddMeeting) => {
				if (!meeting) {
					return;
				}
				const mtg = MeetingUtils.createMeeting(meeting);

				/** Existing meeting. */
				if (mtg?.uuid) {
					this.meetingConfig = MeetingUtils.createMeetingFormConfig(MeetingAction.Edit);
					this.meeting = {
						...this.meeting,
						uuid: mtg?.uuid
					};
					this.populateFormData(mtg);
				}
			});
	}

	private populateFormData(meeting: Meeting) {
		console.info("🧳 💾 AddMeetingComponent ---> populateFormData, add existing meeting: ", meeting);
		/**
		 * Don"t patch the file name, it opens up security risks.
		 */
		this.meetingForm.patchValue({
			name: meeting.name,
			startDate: {
				day: meeting.startDate,
			},
			endDate: {
				day: meeting.endDate,
			},
			description: meeting.description,
			location: meeting.location,
			options: {
				virtual: meeting.virtual,
			},
			startTime: meeting.startTime,
			endTime: meeting.endTime,
		});
	}

	/* returns the form controls of the form. */
	get meetingFormControl(): { [key: string]: AbstractControl } {
		return this.meetingForm.controls;
	}

	get name(): string {
		return this.meetingFormControl.name.value;
	}

	get startDateCtrl(): AbstractControl {
		return this.meetingForm.get("startDate.day");
	}

	get startDate(): CalendarDay {
		return this.meetingForm.get("startDate.day")?.value;
	}

	get endDateCtrl(): AbstractControl {
		return this.meetingForm.get("endDate.day");
	}

	get endDate(): CalendarDay {
		return this.meetingForm.get("endDate.day")?.value;
	}

	get startTime() {
		return this.meetingFormControl.startTime.value;
	}

	get endTime() {
		return this.meetingFormControl.endTime.value;
	}

	get location(): string {
		return this.meetingFormControl.location.value;
	}

	get description(): string {
		return this.meetingFormControl.description.value;
	}

	get isVirtual(): boolean {
		return this.meetingForm.get("options.virtual")?.value;
	}

	onStartTimeChanged($event): void {
		console.log("START CHNAGED: ", $event);
		this.meetingForm.patchValue({
			startTime: $event,
		});
	}

	onEndTimeChanged($event): void {
		console.log("END CHANGED: ", $event);
		this.meetingForm.patchValue({
			endTime: $event,
		});
	}

	onSubmit(): void {
		this.submitted = true;
		console.log("===> start: ", this.meetingFormControl);

		if (this.meetingForm.valid) {
			this.submitted = false;
			this.meeting = {
				...this.meeting,
				description: this.description,
				location: this.location,
				virtual: this.isVirtual,
				name: this.name,
				startDate: this.startDate,
				endDate: this.endDate,
				startTime: this.startTime,
				endTime: this.endTime,
			};

			console.info("🧳 💁🏻‍♀️ AddMeetingComponent ---> onSubmit, meeting: ", this.meeting);
			this.meetingService.modifyMeeting(this.meeting, this.meetingConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.meetingConfig.action) {
						case MeetingAction.Add:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Add, DialogPage.Meeting);
							break;
						case MeetingAction.Edit:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Edit, DialogPage.Meeting);
							break;
					}

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	onCancel(): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Cancel, DialogPage.Meeting)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.navService.navigateToTopic(Topic.Meetings, { relativeTo: this.route });
						break;
					default:
						break;
				}
			});
	}

	subscribeToDialogClose(): void {
		this.dialogService.onConfirmDialogAction$
			.pipe(
				filter((action: ConfirmDialogAction) => action === ConfirmDialogAction.Close),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				/**
				* Once the user successfully edits the form, take them back to the meeting list.
				*/
				this.navService.navigateToTopic(Topic.Meetings, { relativeTo: this.route });
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}