import { Component, OnInit } from '@angular/core';
import { 
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

import { CalendarType } from '../../../../interfaces/calendar/calendar.interface';
import { recurrenceOptions } from '../../../../interfaces/event.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { AddMeeting, Meeting, MeetingAction } from '../../../../interfaces/meeting.interface';
import { FormUtils } from '../../../../utils/form.utils';
import { MeetingUtils } from '../../../../utils/meeting.utils';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
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

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.meetingForm = this.fb.group({
			name: [
				'',
				[
					Validators.required,
					Validators.minLength(this.minChars),
					Validators.maxLength(this.maxChars),
				],
			],
			date: this.fb.group({
				day: ['', [Validators.required]],
			}),
			description: [
				'',
				[
					Validators.maxLength(this.maxDescription),
				]
			],
			location: [
				'',
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
				'',
			]
		},
		{
			updateOn: 'submit'
		});

		this.route.queryParamMap
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				map((params: ParamMap) => JSON.parse(params.get("birthday")))
			)
			.subscribe((meeting: AddMeeting) => {
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

	private populateFormData(meeting: AddMeeting) {
		console.info("🥳 💾 AddMeetingComponent ---> populateFormData, add existing meeting: ", meeting);
		/**
		 * Don't patch the file name, it opens up security risks.
		 */
		this.meetingForm.patchValue({
			name: meeting.name,
			date: {
				day: FormUtils.createCalendarDate(meeting.time),
			},
			description: meeting.description,
			location: meeting.location,
			options: {
				virtual: FormUtils.createCheckboxOption(meeting.virtual),
			},
			recurrence: meeting.recurring,
		});
	}

	/* returns the form controls of the form. */
	get meetingFormControl(): { [key: string]: AbstractControl } {
		return this.meetingForm.controls;
	}

	onSubmit(): void {
	}
}