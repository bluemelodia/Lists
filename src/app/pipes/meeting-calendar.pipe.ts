import { Pipe, PipeTransform } from "@angular/core";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { TimeUtils } from '../utils/time.utils';

@Pipe({
	name: "meetingCalendar"
})
export class MeetingCalendarPipe implements PipeTransform {
	public transform(value: AddMeeting): string {
		if (value) {
			const startTime = TimeUtils.get12HourTime(value.start_hour, value.start_minute);
			return `${value.name} - ${startTime}`;
		}
		return '';
	}
}
