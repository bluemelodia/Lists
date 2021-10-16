import { Endpoint } from "../constants/urls.constants";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { Option } from "../interfaces/event.interface";
import {
	Meeting,
	MeetingAction,
	MeetingConfig,
	MeetingFormSubmitActions,
} from "../interfaces/meeting.interface";
import { AddMeeting } from "../interfaces/service/service-objects.interface";

export class MeetingUtils {
	private static baseURL = Endpoint.TODO;
	private static addMeetingURL = `${MeetingUtils.baseURL}/addMeeting`;
	private static deleteMeetingURL = `${MeetingUtils.baseURL}/deleteMeeting`;
	private static editMeetingURL = `${MeetingUtils.baseURL}/editMeeting`;
	private static getMeetingURL = `${MeetingUtils.baseURL}/getMeetings`;

	public static meetingURLForAction(action: MeetingAction): string {
		let url: string;

		switch (action) {
			case MeetingAction.Add:
				url = MeetingUtils.addMeetingURL;
				break;
			case MeetingAction.Delete:
				url = MeetingUtils.deleteMeetingURL;
				break;
			case MeetingAction.Edit:
				url = MeetingUtils.editMeetingURL;
				break;
			case MeetingAction.Fetch:
				url = MeetingUtils.getMeetingURL;
				break;
		}

		return url;
	}

	public static createMeetingFormConfig(action: MeetingAction): MeetingConfig {
		const config: MeetingConfig = {
			action: action,
			buttonAction: MeetingFormSubmitActions[action]
		};

		return config;
	}

	public static createAddMeeting(meeting: Meeting): AddMeeting {
		const time = meeting.time;
		const recurrence = meeting.recurring;

		const addMeeting: AddMeeting = {
			id: "guest",
			uuid: meeting.uuid,
			description: meeting.description,
			location: meeting.location,
			virtual: meeting.virtual ? 1 : 0,
			name: meeting.name,
			/* Separate out each CalendarDay field to send to the service. */
			value: time.value,
			cmonth: time.cmonth,
			month: time.month,
			cdate: time.cdate,
			date: Number(time.value),
			year: time.year,
			leap: time.leap ? 1 : 0,
			cmonthname: time.cmonthname,
			/* Separate out each occurrence field to send to the service. */
			optionName: recurrence.name,
			optionValue: recurrence.value,
			optionSelected: recurrence.selected ? 1 : 0,
		};
		return addMeeting;
	}

	public static createMeeting(addMeeting: AddMeeting): Meeting {
		const recurring: Option = {
			name: addMeeting.optionName,
			value: addMeeting.optionValue,
			selected: !!addMeeting.optionSelected,
		};

		const time: CalendarDay = {
			value: addMeeting.value,
			cmonth: addMeeting.cmonth,
			leap: !!addMeeting.leap,
			cdate: addMeeting.cdate,
			cmonthname: addMeeting.cmonthname,
			month: addMeeting.month,
			year: addMeeting.year,
		};

		const meeting: Meeting = {
			id: addMeeting.id,
			uuid: addMeeting.uuid,
			description: addMeeting.description,
			location: addMeeting.location,
			virtual: !!addMeeting.virtual,
			name: addMeeting.name,
			recurring: recurring,
			time: time,
		}

		return meeting;
	}
}