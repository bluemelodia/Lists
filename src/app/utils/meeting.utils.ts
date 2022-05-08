import { Endpoint } from "../constants/urls.constants";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { DateStatus } from "../interfaces/date.interface";
import {
	Meeting,
	MeetingAction,
	MeetingConfig,
	MeetingFormSubmitActions,
} from "../interfaces/event/meeting.interface";
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

	public static createMeetingFormConfig(action: MeetingAction): MeetingConfig {
		const config: MeetingConfig = {
			action: action,
			buttonAction: MeetingFormSubmitActions[action]
		};

		return config;
	}

	public static createAddMeeting(meeting: Meeting, userID: string): AddMeeting {
		const startDate = meeting.startDate;
		const endDate = meeting.endDate;

		const startTime = TimeUtils.get24HourTime(meeting.startTime);
		const endTime = TimeUtils.get24HourTime(meeting.endTime);

		const addMeeting: AddMeeting = {
			id: userID,
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
		return MeetingUtils.filterPastMeetings(meetings);
	}

	public static filterPastMeetings(meetings: AddMeeting[]): AddMeeting[] {
		const currentTime = new Date().getTime();
		const filteredMeetings = meetings.filter((meeting: AddMeeting) => {
			const meetingEnd = new Date(meeting.end_year, meeting.end_month - 1, meeting.end_date, meeting.end_hour, meeting.end_minute);
			return currentTime < meetingEnd.getTime();
		});
		return filteredMeetings.sort(this.sortMeetings);
	}

	private static sortMeetings(a: AddMeeting, b: AddMeeting): number {
		return a.start_year - b.start_year
			|| a.start_month - b.start_month
			|| a.start_date - b.start_date
			|| a.start_hour - b.start_hour
			|| a.start_minute - b.start_minute
			|| MeetingUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b ? -1 : (a > b) ? 1 : 0;
	}

	private static tagMeetings(meetings: AddMeeting[]) {
		meetings.forEach((meeting: AddMeeting) => {
			const diff = MeetingUtils.getMeetingDiff(meeting)
			const diffInDays = diff / (1000 * 3600 * 24);
			if (MeetingUtils.isEnded(meeting)) {
				meeting.status = DateStatus.Ended;
			} else if (diff < 0) { // already started
				meeting.status = DateStatus.Started;
			} else if (0 <= diffInDays && diffInDays < 1) { // today
				meeting.status = DateStatus.Today;
			} else if (1 <= diffInDays && diffInDays < 2) { // tomorrow
				meeting.status = DateStatus.Tomorrow;
			} else if (diffInDays < 7) { // this week
				meeting.status = DateStatus.ThisWeek;
			} else if (diffInDays < 14) { // in two weeks
				meeting.status = DateStatus.ComingUp;
			}
		});
	}

	private static getMeetingDiff(meeting: AddMeeting): number {
		const today = new Date();
		const meetingDate = new Date(meeting.start_year, meeting.start_month - 1, meeting.start_date, meeting.start_hour, meeting.start_minute);
		return (meetingDate.getTime() - today.getTime());
	}

	private static isEnded(meeting: AddMeeting): boolean {
		const today = new Date();
		const meetingDate = new Date(meeting.end_year, meeting.end_month - 1, meeting.end_date, meeting.end_hour, meeting.end_minute);
		return (meetingDate.getTime() - today.getTime()) < 0;
	}
}