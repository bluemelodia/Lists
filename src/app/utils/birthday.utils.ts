import { AddBirthday } from "../types/birthday/birthday.types";
import { SelectedDay } from "../types/calendar/calendar-response.types";

export class BirthdayUtils {
	public static createCalendarDate(birthday: AddBirthday): SelectedDay {
		let day: SelectedDay = {
			value: birthday.date,
			month: birthday.month,
			year: birthday.year,
		};

		if (birthday.lunar) {
			day.cmonth = birthday.cmonth;
			day.leap = birthday.leap === 1 ? true : false;
			day.cdate = birthday.cdate;
			day.cmonthname = birthday.cmonthname;
		}

		return day;
	}

    public static createCheckboxOption(value: number): boolean {
        return !value ? false : true;
    }
}