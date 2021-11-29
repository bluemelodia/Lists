import {
	Birthday,
	BirthdayConfig,
	BirthdayAction,
	BirthdayFormSubmitActions,
	BirthdayList,
} from "../interfaces/birthday.interface";
import { Endpoint } from "../constants/urls.constants";

import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { DateStatus } from "../interfaces/date.interface";
import { Dialog } from "../interfaces/dialog.interface";
import { AddBirthday } from "../interfaces/service/service-objects.interface";

export class BirthdayUtils {
	private static baseURL = Endpoint.BIRTHDAY;
	private static addBirthdayURL = `${BirthdayUtils.baseURL}/addBirthday`;
	private static deleteBirthdayURL = `${BirthdayUtils.baseURL}/deleteBirthday`;
	private static editBirthdayURL = `${BirthdayUtils.baseURL}/editBirthday`;
	private static getBirthdayURL = `${BirthdayUtils.baseURL}/getBirthdays`;

	public static birthdayURLForAction(action: BirthdayAction): string {
		let url: string;

		switch (action) {
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
		const day: CalendarDay = {
			value: birthday.date.value,
			month: birthday.date.month,
			year: birthday.date.year,
		};

		day.cmonth = birthday.date.cmonth;
		day.leap = birthday.leap === 1 ? true : false;
		day.cdate = birthday.date.cdate;
		day.cmonthname = birthday.date.cmonthname;

		return day;
	}

	public static createBirthdayFormConfig(action: BirthdayAction): BirthdayConfig {
		const config: BirthdayConfig = {
			action: action,
			buttonAction: BirthdayFormSubmitActions[action]
		};

		return config;
	}

	public static birthdayDialogForAction(action: BirthdayAction): Dialog {
		let dialogType: Dialog;

		switch (action) {
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
			...birthday,
			id: "guest",
			leap: date.leap ? 1 : 0,
			lunar: birthday.options.lunar ? 1 : 0,
			filename: BirthdayUtils.extractFileURL(birthday.profile?.fileName),
			image: birthday.profile?.image
		};
		console.log("===> send birthday: ", addBirthday);
		return addBirthday;
	}

	private static extractFileURL(fileName: string) {
		if (!fileName) {
			return null;
		}

		/**
		 * The string is prefixed with C:\fakepath\, to prevent malicious software 
		 * from guessing the user"s file structure.
		 */
		return fileName.substring(fileName.lastIndexOf("\\") + 1);
	}

	public static createBirthdayLists(birthdays: AddBirthday[]): BirthdayList {
		const solarBirthdays = [];
		const lunarBirthdays = [];

		birthdays?.forEach((birthday: AddBirthday) => {
			if (birthday.lunar) {
				lunarBirthdays.push(birthday);
			} else {
				solarBirthdays.push(birthday);
			}
		});

		lunarBirthdays.sort(BirthdayUtils.sortLunarBirthdays);
		solarBirthdays.sort(BirthdayUtils.sortSolarBirthdays);
		BirthdayUtils.tagBirthdays(solarBirthdays);

		return {
			list: birthdays,
			lunar: lunarBirthdays,
			solar: solarBirthdays
		}
	}

	public static tagBirthdays(birthdays: AddBirthday[]) {
		birthdays.forEach((birthday: AddBirthday) => {
			const diffInDays = birthday.lunar ? BirthdayUtils.getLunarDiff(birthday) : BirthdayUtils.getSolarDiff(birthday);

			if (-1 < diffInDays && diffInDays <= 0) { // today
				birthday.status = DateStatus.Today;
			} else if (0 < diffInDays && diffInDays <= 1) { // tomorrow
				birthday.status = DateStatus.Tomorrow;
			} else if (diffInDays < 0) { // already passed
				birthday.status = DateStatus.Passed;
			} else if (diffInDays < 7) { // this week
				birthday.status = DateStatus.ThisWeek;
			} else if (diffInDays < 14) { // in two weeks
				birthday.status = DateStatus.ComingUp;
			}
		});
	}

	private static getSolarDiff(birthday: AddBirthday): number {
		const today = new Date();
		const birthDate = new Date(today.getFullYear(), birthday.date.month - 1, birthday.date.value);

		return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
	}

	/** Check only if this year's lunar date has passed. */
	private static getLunarDiff(birthday: AddBirthday): number {
		const today = new Date();
		if (birthday.futureDates) {
			const date = birthday.futureDates[today.getFullYear()];
			const birthDate = new Date(date?.year, date?.cmonth, date?.cdate);
			return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
		}
		return 0;
	}

	/** 
	 * First sort by the birth date, then differentiate by names.
	 */
	private static sortLunarBirthdays(a: AddBirthday, b: AddBirthday): number {
		return a.date.year - b.date.year || BirthdayUtils.sortSolarBirthdays(a, b);
	}

	private static sortSolarBirthdays(a: AddBirthday, b: AddBirthday): number {
		return a.date.month - b.date.month || a.date.value - b.date.value || BirthdayUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b ? -1 : (a > b) ? 1 : 0;
	}
}