import {v4 as uuidv4} from 'uuid';

import { 
    BirthdayConfig,
    BirthdayFormAction,
    BirthdayFormSubmitActions,
} from "../constants/birthday";
import { AddBirthday, Birthday } from "../types/birthday/birthday.types";
import { CalendarDay } from "../types/calendar/calendar-response.types";

export class BirthdayUtils {
	public static createCalendarDate(birthday: AddBirthday): CalendarDay {
		let day: CalendarDay = {
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
        return !!value ? false : true;
    }

    public static createBirthdayFormConfig(action: BirthdayFormAction): BirthdayConfig {
        let config: BirthdayConfig = {
            action: action,
            buttonAction: BirthdayFormSubmitActions[action]
        };

        return config;
    }

    public static formatBirthday(birthday: Birthday): AddBirthday {
		const date = birthday.date;
		const addBirthday: AddBirthday = {
			id: 'guest',
			uuid: birthday.uuid || uuidv4(),
			cmonth: date.cmonth,
			month: date.month,
			cdate: date.cdate,
			date: date.value,
			year: date.year,
			name: birthday.name,
			call: birthday.options.call ? 1 : 0,
			text: birthday.options.text ? 1 : 0,
			gift: birthday.options['buy-present'] ? 1 : 0,
			leap: date.leap ? 1 : 0,
			cmonthname: date.cmonthname,
			lunar: birthday.options.lunar ? 1 : 0,
		};
		return addBirthday;
	}

    public static sortBirthdays(birthdays: AddBirthday[]): AddBirthday[] {
		return birthdays.sort(BirthdayUtils.sortByBirthDate);
	}

	private static sortByBirthDate(a: AddBirthday, b: AddBirthday): number {
		return a.month - b.month || a.date - b.date;
	}
}