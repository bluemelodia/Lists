import { Endpoint } from "../constants/urls.constants";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { DateStatus } from "../interfaces/date.interface";
import { Dialog } from "../interfaces/dialog.interface";
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
			/* Format: 12:00 AM. */
			start_hour: startTime.hours,
			start_minute: startTime.minutes,
			end_hour: endTime.hours,
			end_minute: endTime.minutes
		};
		return addMeeting;
	}

	public static createMeeting(addMeeting: AddMeeting): Meeting {
		const startDate: CalendarDay = MeetingUtils.createStartDate(addMeeting);
		const endDate: CalendarDay = MeetingUtils.createEndDate(addMeeting);

		const startTime = TimeUtils.get12HourTime(addMeeting.start_hour, addMeeting.start_minute);
		const endTime = TimeUtils.get12HourTime(addMeeting.end_hour, addMeeting.end_minute);

		const meeting: Meeting = {
			id: addMeeting.id,
			uuid: addMeeting.uuid,
			description: addMeeting.description,
			location: addMeeting.location,
			virtual: !!addMeeting.virtual,
			name: addMeeting.name,
			startDate: startDate,
			endDate: endDate,
			startTime: startTime,
			endTime: endTime,
		};

		return meeting;
	}

	public static createStartDate(addMeeting: AddMeeting): CalendarDay {
		return {
			value: Number(addMeeting.start_value),
			cmonth: addMeeting.start_cmonth,
			leap: !!addMeeting.start_leap,
			cdate: addMeeting.start_cdate,
			cmonthname: addMeeting.start_cmonthname,
			month: addMeeting.start_month,
			year: addMeeting.start_year,
		};
	}

	public static createEndDate(addMeeting: AddMeeting): CalendarDay {
		return {
			value: Number(addMeeting.end_value),
			cmonth: addMeeting.end_cmonth,
			leap: !!addMeeting.end_leap,
			cdate: addMeeting.end_cdate,
			cmonthname: addMeeting.end_cmonthname,
			month: addMeeting.end_month,
			year: addMeeting.end_year,
		};
	}

	/** 
	* Only return unended meetings.
	*/
	public static processMeetings(meetings: AddMeeting[]): AddMeeting[] {
		MeetingUtils.tagMeetings(meetings);

		const currentTime = new Date().getTime();
		return meetings.filter((meeting: AddMeeting) => {
			const meetingEnd = new Date(meeting.end_year, meeting.end_month - 1, meeting.end_date, meeting.end_hour, meeting.end_minute);
			return currentTime < meetingEnd.getTime();
		});
	}

	private static tagMeetings(meetings: AddMeeting[]) {
		meetings.forEach((meeting: AddMeeting) => {
			const diffInDays = MeetingUtils.getMeetingDiff(meeting);
			if (-1 < diffInDays && diffInDays <= 0) { // today
				meeting.status = DateStatus.Today;
			} else if (0 < diffInDays && diffInDays <= 1) { // tomorrow
				meeting.status = DateStatus.Tomorrow;
			} else if (diffInDays < 0) { // already passed
				meeting.status = DateStatus.Passed;
			} else if (diffInDays < 7) { // this week
				meeting.status = DateStatus.ThisWeek;
			} else if (diffInDays < 14) { // in two weeks
				meeting.status = DateStatus.ComingUp;
			}
		});
	}

	public static getMeetingDay(meetingDay: number): string {
		switch (meetingDay) {
			case 0:
				return "Mon";
			case 1:
				return "Tues";
			case 2:
				return "Wed";
			case 3:
				return "Thu";
			case 4:
				return "Fri";
			case 5:
				return "Sat";
			case 6:
				return "Sun";
		}
	}

	public static getMeetingMonth(month: number): string {
		switch (month) {
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
		}
	}

	public static getMeetingDate(date: number): string {
		const remainder = date % 10;
		let suffix = 'th';

		if (remainder === 1 && date !== 11) { // 1st, 21st, 31st
			suffix = 'st';
		} else if (remainder === 2 && date !== 12) { // 2nd, 22nd
			suffix = 'nd';
		} else if (remainder === 3 && date !== 13) { // 3rd, 23rd
			suffix = 'rd';
		}

		return `${date}${suffix}`;
	}

	private static getMeetingDiff(meeting: AddMeeting): number {
		const today = new Date();
		const meetingDate = new Date(meeting.start_year, meeting.start_month - 1, meeting.start_date);

		return (meetingDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
	}
}