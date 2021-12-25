import { Pipe, PipeTransform } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { CalendarType } from "../interfaces/calendar/calendar.interface";

@Pipe({
	name: "pickerDateFormatter"
})
export class PickerDateFormatterPipe implements PipeTransform {
	public transform(value: CalendarDay, calendarType: CalendarType): string {
		if (value) {
			const cmonthStr = value.cmonth ? ` - ${value.cmonthname} ${value.cmonth}/${value.cdate}` : "";
			return `${value.month}/${value.value}/${value.year}${calendarType === CalendarType.Lunar ? cmonthStr : ""}`;
		}
		return null;
	}
}
