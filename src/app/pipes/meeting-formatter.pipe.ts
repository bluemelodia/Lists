import { Pipe, PipeTransform } from "@angular/core";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { MeetingUtils } from "../utils/meeting.utils";

@Pipe({
	name: "meetingFormatter"
})
export class MeetingFormatterPipe implements PipeTransform {
	public transform(value: AddMeeting): unknown {
		if (value) {
			const startDate = new Date(value.start_year, value.start_month - 1, value.start_date, value.start_hour, value.start_minute);
			const endDate = new Date(value.end_year, value.end_month - 1, value.end_date, value.end_hour, value.end_minute);

			const isSameYear = value.start_year === value.end_year;

			let startDateFormatted = `${MeetingUtils.getMeetingDay(startDate.getDay())} - ${MeetingUtils.getMeetingMonth(startDate.getMonth())} ${MeetingUtils.getMeetingDate(startDate.getDate())}`;
			let endDateFormatted = `${MeetingUtils.getMeetingDay(endDate.getDay())} - ${MeetingUtils.getMeetingMonth(endDate.getMonth())} ${MeetingUtils.getMeetingDate(endDate.getDate())}`;
			if (!isSameYear) {
				startDateFormatted += startDate.getFullYear();
				endDateFormatted += endDate.getFullYear();
			}
			return `${startDateFormatted} to ${endDateFormatted}`;
		}
		return null;
	}
}
