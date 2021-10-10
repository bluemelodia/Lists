import { Component, OnInit } from '@angular/core';
import { 
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

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
	headerLevel: HeaderLevel;
	meeting: Meeting;
	meetingConfig = MeetingUtils.createMeetingFormConfig(MeetingAction.Add);
	meetingForm: FormGroup;

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
					Validators.minLength(1),
					Validators.maxLength(255),
				],
			],
			date: this.fb.group({
				meeting: ['', [Validators.required]],
			}),
			description: [
				'',
				[
					Validators.maxLength(255),
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
				meeting: meeting.time,
			},
			description: meeting.description,
			location: meeting.location,
			options: {
				virtual: FormUtils.createCheckboxOption(meeting.virtual),
			},
			recurrence: meeting.recurring,
		});
	}

	onSubmit(): void {
	}
}