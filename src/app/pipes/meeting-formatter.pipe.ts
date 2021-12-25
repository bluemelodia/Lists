import { Pipe, PipeTransform } from "@angular/core";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { MeetingUtils } from "../utils/meeting.utils";
import { TimeUtils } from '../utils/time.utils';

@Pipe({
	name: "meetingFormatter"
})
export class MeetingFormatterPipe implements PipeTransform {
	public transform(value: AddMeeting, isStart: boolean): string {
		if (value) {
			if (isStart) {
				const startDate = new Date(value.start_year, value.start_month - 1, value.start_date, value.start_hour, value.start_minute);
				let startDateFormatted = `${MeetingUtils.getMeetingDay(startDate.getDay())} - ${MeetingUtils.getMeetingMonth(startDate.getMonth())} ${MeetingUtils.getMeetingDate(startDate.getDate())}`;				
				startDateFormatted += `, ${startDate.getFullYear()}`;

				const startTime = TimeUtils.get12HourTime(value.start_hour, value.start_minute);
				return `${startDateFormatted} ${startTime}`;
			} else {
				const endDate = new Date(value.end_year, value.end_month - 1, value.end_date, value.end_hour, value.end_minute);
				let endDateFormatted = `${MeetingUtils.getMeetingDay(endDate.getDay())} - ${MeetingUtils.getMeetingMonth(endDate.getMonth())} ${MeetingUtils.getMeetingDate(endDate.getDate())}`;
				endDateFormatted += `, ${endDate.getFullYear()}`;

				const endTime = TimeUtils.get12HourTime(value.end_hour, value.end_minute);
				return `${endDateFormatted} ${endTime}`;
			}			
		}
		return null;
	}
}
