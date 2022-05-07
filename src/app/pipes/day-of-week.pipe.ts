import { Pipe, PipeTransform } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { TimeUtils } from "../utils/time.utils";

@Pipe({
	name: "dayOfWeek"
})
export class DayOfWeekPipe implements PipeTransform {
	public transform(value: CalendarDay): string {
		const dayOfWeek = new Date();
		dayOfWeek.setMonth(value.month - 1);
		dayOfWeek.setDate(value.value);
		dayOfWeek.setFullYear(value.year);

		return `${TimeUtils.getDayOfWeek(dayOfWeek.getDay())}`;
	}
}
