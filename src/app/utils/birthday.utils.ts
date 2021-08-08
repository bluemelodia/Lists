import { 
    BirthdayConfig,
    BirthdayAction,
    BirthdayFormSubmitActions,
} from "../constants/birthday";
import { Endpoint } from '../constants/urls';

import { AddBirthday, Birthday } from "../types/birthday/birthday.types";
import { CalendarDay } from "../types/calendar/calendar-response.types";
import { Dialog } from '../types/dialog/dialog.types';

export class BirthdayUtils {
	private static baseURL = Endpoint.TODO;
	private static addBirthdayURL = `${BirthdayUtils.baseURL}/addBirthday`;
	private static deleteBirthdayURL = `${BirthdayUtils.baseURL}/deleteBirthday`;
	private static editBirthdayURL = `${BirthdayUtils.baseURL}/editBirthday`;
	private static getBirthdayURL = `${BirthdayUtils.baseURL}/getBirthdays`;

	public static birthdayURLForAction(action: BirthdayAction): string {
		let url: string;
		
		switch(action) {
			case BirthdayAction.Add:
				url = BirthdayUtils.addBirthdayURL;
				break;
			case BirthdayAction.Delete:
				url = BirthdayUtils.deleteBirthdayURL;
				break;
			case BirthdayAction.Edit:
				url = BirthdayUtils.editBirthdayURL;
				break;
			case BirthdayAction.Fetch:
				url = BirthdayUtils.getBirthdayURL;
				break;
		}

		return url;
	}

	public static createCalendarDate(birthday: AddBirthday): CalendarDay {
		let day: CalendarDay = {
			value: birthday.date,
			month: birthday.month,
			year: birthday.year,
		};

		day.cmonth = birthday.cmonth;
		day.leap = birthday.leap === 1 ? true : false;
		day.cdate = birthday.cdate;
		day.cmonthname = birthday.cmonthname;

		return day;
	}

    public static createCheckboxOption(value: number): boolean {
        return !!value;
    }

    public static createBirthdayFormConfig(action: BirthdayAction): BirthdayConfig {
        let config: BirthdayConfig = {
            action: action,
            buttonAction: BirthdayFormSubmitActions[action]
        };

        return config;
    }

	public static birthdayDialogForAction(action: BirthdayAction): Dialog {
		let dialogType: Dialog;
		
		switch(action) {
			case BirthdayAction.Add:
				dialogType = Dialog.AddBirthday;
				break;
			case BirthdayAction.Edit:
				dialogType = Dialog.EditBirthday;
				break;
		}

		return dialogType;
	}

	public static formatBirthday(birthday: Birthday): AddBirthday {
		const date = birthday.date;
		const addBirthday: AddBirthday = {
			id: 'guest',
			uuid: birthday.uuid,
			cmonth: date.cmonth,
			month: date.month,
			cdate: date.cdate,
			date: Number(date.value),
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

	/** 
	 * First sort by the birth date, then differentiate by names.
	 */
	private static sortByBirthDate(a: AddBirthday, b: AddBirthday): number {
		return a.year - b.year || a.month - b.month || a.date - b.date || BirthdayUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b? -1 : (a > b) ? 1 : 0;
	}
}