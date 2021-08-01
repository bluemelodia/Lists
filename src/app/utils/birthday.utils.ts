import {v4 as uuidv4} from 'uuid';

import { 
    BirthdayConfig,
    BirthdayAction,
    BirthdayFormSubmitActions,
} from "../constants/birthday";
import { BASE_URL } from '../constants/urls';

import { AddBirthday, Birthday } from "../types/birthday/birthday.types";
import { CalendarDay } from "../types/calendar/calendar-response.types";
import { Dialog } from '../types/dialog/dialog.types';

export class BirthdayUtils {
	private static addBirthdayURL = BASE_URL + 'addBirthday';
	private static deleteBirthdayURL = BASE_URL + 'deleteBirthday';
	private static editBirthdayURL = BASE_URL + 'editBirthday';
	private static getBirthdayURL = BASE_URL + 'getBirthdays';

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
			uuid: birthday.uuid || uuidv4(),
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

	private static sortByBirthDate(a: AddBirthday, b: AddBirthday): number {
		return a.month - b.month || a.date - b.date;
	}
}