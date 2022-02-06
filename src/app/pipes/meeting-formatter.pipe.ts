import { Pipe, PipeTransform } from "@angular/core";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { TimeUtils } from '../utils/time.utils';

@Pipe({
	name: "meetingFormatter"
})
export class MeetingFormatterPipe implements PipeTransform {
	public transform(value: AddMeeting, isStart: boolean, shorthand: boolean): string {
		if (value) {
			if (isStart) {
				const startDate = new Date(value.start_year, value.start_month - 1, value.start_date, value.start_hour, value.start_minute);
				const startTime = TimeUtils.get12HourTime(value.start_hour, value.start_minute);
				
				if (shorthand) {
					return `${value.start_month}/${value.start_date}/${value.start_year.toString().slice(-2)} ${startTime}`;
				}

				let startDateFormatted = `${TimeUtils.getDayOfWeek(startDate.getDay())} - ${TimeUtils.getMonth(startDate.getMonth())} ${TimeUtils.getDateOfMonth(startDate.getDate())}`;
				startDateFormatted += `, ${startDate.getFullYear()}`;

				return `${startDateFormatted} ${startTime}`;
			} else {
				const endDate = new Date(value.end_year, value.end_month - 1, value.end_date, value.end_hour, value.end_minute);
				const endTime = TimeUtils.get12HourTime(value.end_hour, value.end_minute);

				if (shorthand) {
					return `${value.end_month}/${value.end_date}/${value.end_year.toString().slice(-2)} ${endTime}`;
				}
				
				let endDateFormatted = `${TimeUtils.getDayOfWeek(endDate.getDay())} - ${TimeUtils.getMonth(endDate.getMonth())} ${TimeUtils.getDateOfMonth(endDate.getDate())}`;
				endDateFormatted += `, ${endDate.getFullYear()}`;

				return `${endDateFormatted} ${endTime}`;
			}
		}
		return null;
	}
}
