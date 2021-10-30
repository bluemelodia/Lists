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
			id: "guest",
			uuid: birthday.uuid,
			cmonth: date.cmonth,
			month: date.month,
			cdate: date.cdate,
			date: Number(date.value),
			year: date.year,
			name: birthday.name,
			call: birthday.options.call ? 1 : 0,
			text: birthday.options.text ? 1 : 0,
			gift: birthday.options["buy-present"] ? 1 : 0,
			leap: date.leap ? 1 : 0,
			cmonthname: date.cmonthname,
			lunar: birthday.options.lunar ? 1 : 0,
			filename: BirthdayUtils.extractFileURL(birthday.profile?.fileName),
			image: birthday.profile?.image,
		};
		//console.log("====> send this birthday: ", addBirthday);
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

	public static processBirthdays(birthdays: AddBirthday[]): AddBirthday[] {
		BirthdayUtils.tagBirthdays(birthdays);
		return birthdays;
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

		return {
			list: birthdays,
			lunar: lunarBirthdays,
			solar: solarBirthdays
		}
	}

	private static tagBirthdays(birthdays: AddBirthday[]) {
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
		const birthDate = new Date(today.getFullYear(), birthday.month - 1, birthday.date);

		return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
	}

	private static getLunarDiff(birthday: AddBirthday): number {
		const today = new Date();
		const birthDate = new Date(birthday.year, birthday.month - 1, birthday.date);

		return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
	}

	/** 
	 * First sort by the birth date, then differentiate by names.
	 */
	private static sortLunarBirthdays(a: AddBirthday, b: AddBirthday): number {
		return a.year - b.year || BirthdayUtils.sortSolarBirthdays(a, b);
	}

	private static sortSolarBirthdays(a: AddBirthday, b: AddBirthday): number {
		return a.month - b.month || a.date - b.date || BirthdayUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b ? -1 : (a > b) ? 1 : 0;
	}
}