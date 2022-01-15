import { Pipe, PipeTransform } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { CalendarType } from "../interfaces/calendar/calendar.interface";

@Pipe({
	name: "pickerDateFormatter"
})
export class PickerDateFormatterPipe implements PipeTransform {
	public transform(value: CalendarDay, calendarType: CalendarType): string {
		if (value) {
			const solarDate = `${value.month}/${value.value}`;
			const lunarDate = `${value.cmonthname} ${value.cmonth}/${value.cdate}`;

			switch (calendarType) {
				case CalendarType.Solar:
					return solarDate;
				case CalendarType.Lunar:
					return value.cmonth ? lunarDate : solarDate;
			}
		}
		return null;
	}
}
