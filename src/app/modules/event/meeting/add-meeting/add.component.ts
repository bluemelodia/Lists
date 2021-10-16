import { Component, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";

import { CalendarType } from "../../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../../interfaces/calendar/calendar-response.interface";
import { Option, Recurrence, recurrenceOptions } from "../../../../interfaces/event.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import {
	Meeting,
	MeetingAction,
} from "../../../../interfaces/meeting.interface";

import { MeetingService } from "../../../../services/meeting.service";
import { MeetingUtils } from "../../../../utils/meeting.utils";

@Component({
	selector: "app-add-meeting",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddMeetingComponent implements OnInit {
	maxChars = 255;
	maxDescription = 1000;
	minChars = 1;

	meeting: Meeting;
	meetingAction = MeetingAction;
	meetingConfig = MeetingUtils.createMeetingFormConfig(MeetingAction.Add);
	meetingForm: FormGroup;

	public calendarType: CalendarType = CalendarType.Solar;
	public headerLevel = HeaderLevel;
	public submitted = false;
	public recurrence = recurrenceOptions;

	selectedRecurrence: Option = recurrenceOptions.find((recurrence) => {
		return recurrence.selected || recurrence.name === Recurrence.Once;
	});

	constructor(
		private fb: FormBuilder,
		private meetingService: MeetingService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.meetingForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(this.minChars),
					Validators.maxLength(this.maxChars),
				],
			],
			date: this.fb.group({
				day: ["", [Validators.required]],
			}),
			description: [
				"",
				[
					Validators.maxLength(this.maxDescription),
				]
			],
			location: [
				"",
				[
					Validators.required,
					Validators.minLength(1),
					Validators.maxLength(255),
				]
			],
			options: this.fb.group({
				virtual: this.fb.control(false),
			}),
			recurrence: [
				"",
			]
		},
			{
				updateOn: "submit"
			});

		this.route.queryParamMap
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				map((params: ParamMap) => JSON.parse(params.get("meeting")))
			)
			.subscribe((meeting: Meeting) => {
				/** Existing birthday. */
				if (meeting?.uuid) {
					this.meetingConfig = MeetingUtils.createMeetingFormConfig(MeetingAction.Edit);
					this.meeting = {
						...this.meeting,
						uuid: meeting?.uuid
					};
					this.populateFormData(meeting);
				}
			});
	}

	private populateFormData(meeting: Meeting) {
		console.info("🥳 💾 AddMeetingComponent ---> populateFormData, add existing meeting: ", meeting);
		/**
		 * Don"t patch the file name, it opens up security risks.
		 */
		this.meetingForm.patchValue({
			name: meeting.name,
			date: {
				day: meeting.time,
			},
			description: meeting.description,
			location: meeting.location,
			options: {
				virtual: meeting.virtual,
			},
			recurrence: meeting.recurring,
		});
	}

	/* returns the form controls of the form. */
	get meetingFormControl(): { [key: string]: AbstractControl } {
		return this.meetingForm.controls;
	}

	get name(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.meetingFormControl.name.value;
	}

	get date(): CalendarDay {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.meetingForm.get("date.day")?.value;
	}

	get location(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.meetingFormControl.location.value;
	}

	get description(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.meetingFormControl.description.value;
	}

	setEventRecurrence(recurrence: Option) {
		this.selectedRecurrence = recurrence;
	}

	get eventRecurrence(): Option {
		return this.selectedRecurrence;
	}

	get isVirtual(): boolean {
		return this.meetingForm.get("options.virtual")?.value;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.meetingForm.valid) {
			this.submitted = false;
			this.meeting = {
				...this.meeting,
				description: this.description,
				location: this.location,
				virtual: this.isVirtual,
				name: this.name,
				recurring: this.eventRecurrence,
				time: this.date,
			};

			console.info("🥳 💁🏻‍♀️ AddMeetingComponent ---> onSubmit, meeting: ", this.meeting);
		}
	}
}