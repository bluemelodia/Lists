import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";

export class FormUtils {
	public static createCalendarDate(calendarDate: string): CalendarDay {
		const date = new Date(calendarDate);
		const day: CalendarDay = {
			value: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear(),
		};

		return day;
	}

	public static createCheckboxOption(value: number): boolean {
		return !!value;
	}
}