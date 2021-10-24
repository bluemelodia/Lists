import { Endpoint } from "../constants/urls.constants";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { Dialog } from "../interfaces/dialog.interface";
import { Option } from "../interfaces/event.interface";
import {
	Meeting,
	MeetingAction,
	MeetingConfig,
	MeetingFormSubmitActions,
} from "../interfaces/meeting.interface";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { TimeUtils } from "./time.utils";

export class MeetingUtils {
	private static baseURL = Endpoint.MEETING;
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

	public static meetingDialogForAction(action: MeetingAction): Dialog {
		let dialogType: Dialog;

		switch (action) {
			case MeetingAction.Add:
				dialogType = Dialog.AddMeeting;
				break;
			case MeetingAction.Edit:
				dialogType = Dialog.EditMeeting;
				break;
		}

		return dialogType;
	}

	public static createMeetingFormConfig(action: MeetingAction): MeetingConfig {
		const config: MeetingConfig = {
			action: action,
			buttonAction: MeetingFormSubmitActions[action]
		};

		return config;
	}

	public static createAddMeeting(meeting: Meeting): AddMeeting {
		const startDate = meeting.startDate;
		const endDate = meeting.endDate;
		const recurrence = meeting.recurring;

		const startTime = TimeUtils.get24HourTime(meeting.startTime);
		const endTime = TimeUtils.get24HourTime(meeting.endTime);

		const addMeeting: AddMeeting = {
			id: "guest",
			uuid: meeting.uuid,
			description: meeting.description,
			location: meeting.location,
			virtual: meeting.virtual ? 1 : 0,
			name: meeting.name,
			/* Separate out each CalendarDay field to send to the service. */
			start_value: startDate.value,
			start_cmonth: startDate.cmonth,
			start_month: startDate.month,
			start_cdate: startDate.cdate,
			start_date: Number(startDate.value),
			start_year: startDate.year,
			start_leap: startDate.leap ? 1 : 0,
			start_cmonthname: startDate.cmonthname,
			end_value: endDate.value,
			end_cmonth: endDate.cmonth,
			end_month: endDate.month,
			end_cdate: endDate.cdate,
			end_date: Number(endDate.value),
			end_year: endDate.year,
			end_leap: endDate.leap ? 1 : 0,
			end_cmonthname: endDate.cmonthname,
			/* Separate out each occurrence field to send to the service. */
			optionName: recurrence.name,
			optionValue: recurrence.value,
			optionSelected: recurrence.selected ? 1 : 0,
			/* Format: 12:00 AM. */
			start_hour: startTime.hours,
			start_minute: startTime.minutes,
			end_hour: endTime.hours,
			end_minute: endTime.minutes
		};
		return addMeeting;
	}

	public static createMeeting(addMeeting: AddMeeting): Meeting {
		const recurring: Option = {
			name: addMeeting.optionName,
			value: addMeeting.optionValue,
			selected: !!addMeeting.optionSelected,
		};

		const startDate: CalendarDay = {
			value: addMeeting.start_value,
			cmonth: addMeeting.start_cmonth,
			leap: !!addMeeting.start_leap,
			cdate: addMeeting.start_cdate,
			cmonthname: addMeeting.start_cmonthname,
			month: addMeeting.start_month,
			year: addMeeting.start_year,
		};

		const endDate: CalendarDay = {
			value: addMeeting.end_value,
			cmonth: addMeeting.end_cmonth,
			leap: !!addMeeting.end_leap,
			cdate: addMeeting.end_cdate,
			cmonthname: addMeeting.end_cmonthname,
			month: addMeeting.end_month,
			year: addMeeting.end_year,
		};

		const startTime = TimeUtils.get12HourTime(addMeeting.start_hour, addMeeting.start_minute);
		const endTime = TimeUtils.get12HourTime(addMeeting.end_hour, addMeeting.end_minute);

		const meeting: Meeting = {
			id: addMeeting.id,
			uuid: addMeeting.uuid,
			description: addMeeting.description,
			location: addMeeting.location,
			virtual: !!addMeeting.virtual,
			name: addMeeting.name,
			recurring: recurring,
			startDate: startDate,
			endDate: endDate,
			startTime: startTime,
			endTime: endTime,
		};

		return meeting;
	}
}