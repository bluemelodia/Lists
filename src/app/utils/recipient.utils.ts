import {
	Recipient,
	RecipientConfig,
	RecipientAction,
	RecipientFormSubmitActions,
	RecipientList,
} from "../interfaces/event/recipient.interface";
import { Endpoint } from "../constants/urls.constants";

import { EventUtils } from "./event.utils";

import { CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { DateStatus } from "../interfaces/date.interface";
import { AddRecipient } from "../interfaces/service/service-objects.interface";

export class RecipientUtils {
	private static baseURL = Endpoint.BIRTHDAY;
	private static addRecipientURL = `${RecipientUtils.baseURL}/addBirthday`;
	private static deleteRecipientURL = `${RecipientUtils.baseURL}/deleteBirthday`;
	private static editRecipientURL = `${RecipientUtils.baseURL}/editBirthday`;
	private static getRecipientURL = `${RecipientUtils.baseURL}/getBirthdays`;

	public static recipientURLForAction(action: RecipientAction): string {
		let url: string;

		switch (action) {
			case RecipientAction.Add:
				url = RecipientUtils.addRecipientURL;
				break;
			case RecipientAction.Delete:
				url = RecipientUtils.deleteRecipientURL;
				break;
			case RecipientAction.Edit:
				url = RecipientUtils.editRecipientURL;
				break;
			case RecipientAction.Fetch:
				url = RecipientUtils.getRecipientURL;
				break;
		}

		return url;
	}

	public static createCalendarDate(recipient: AddRecipient): CalendarDay {
		const day: CalendarDay = {
			value: recipient.date.value,
			month: recipient.date.month,
			year: recipient.date.year,
		};

		day.cmonth = recipient.date.cmonth;
		day.leap = recipient.leap === 1 ? true : false;
		day.cdate = recipient.date.cdate;
		day.cmonthname = recipient.date.cmonthname;

		return day;
	}

	public static createRecipientFormConfig(action: RecipientAction): RecipientConfig {
		const config: RecipientConfig = {
			action: action,
			buttonAction: RecipientFormSubmitActions[action]
		};

		return config;
	}

	public static formatRecipient(recipient: Recipient): AddRecipient {
		const date = recipient.date;
		const addRecipient: AddRecipient = {
			...recipient,
			id: "guest",
			leap: date.leap ? 1 : 0,
			lunar: recipient.options.lunar ? 1 : 0,
			email: recipient.email.length > 6 ? recipient.email : '',
			filename: EventUtils.extractFileURL(recipient.profile?.fileName),
			image: recipient.profile?.image || '',
		};
		return addRecipient;
	}

	public static createRecipientLists(birthdays: AddRecipient[]): RecipientList {
		const solarList = [];
		const lunarList = [];

		birthdays?.forEach((recipient: AddRecipient) => {
			if (recipient.lunar) {
				lunarList.push(recipient);
			} else {
				solarList.push(recipient);
			}
		});

		lunarList.sort(RecipientUtils.sortLunar);
		solarList.sort(RecipientUtils.sortSolar);
		RecipientUtils.tagRecipients(solarList);

		return {
			list: birthdays,
			lunar: lunarList,
			solar: solarList
		}
	}

	public static tagRecipients(recipients: AddRecipient[]): void {
		recipients.forEach((recipient: AddRecipient) => {
			const diffInDays = recipient.lunar ? RecipientUtils.getLunarDiff(recipient) : RecipientUtils.getSolarDiff(recipient);

			if (-1 < diffInDays && diffInDays <= 0) { // today
				recipient.status = DateStatus.Today;
			} else if (0 < diffInDays && diffInDays <= 1) { // tomorrow
				recipient.status = DateStatus.Tomorrow;
			} else if (diffInDays < 0) { // already passed
				recipient.status = DateStatus.Passed;
			} else if (diffInDays < 7) { // this week
				recipient.status = DateStatus.ThisWeek;
			} else if (diffInDays < 14) { // in two weeks
				recipient.status = DateStatus.ComingUp;
			}
		});
	}

	private static getSolarDiff(recipient: AddRecipient): number {
		const today = new Date();
		const birthDate = new Date(today.getFullYear(), recipient.date.month - 1, recipient.date.value);

		return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
	}

	/** Check only if this year's lunar date has passed. */
	private static getLunarDiff(recipient: AddRecipient): number {
		const today = new Date();
		if (recipient.futureDates) {
			const date = recipient.futureDates[today.getFullYear()];
			const birthDate = new Date(date?.year, date?.cmonth, date?.cdate);
			return (birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
		}
		return 0;
	}

	/** 
	 * First sort by the birth date, then differentiate by names.
	 */
	private static sortLunar(a: AddRecipient, b: AddRecipient): number {
		return a.date.year - b.date.year || RecipientUtils.sortSolar(a, b);
	}

	private static sortSolar(a: AddRecipient, b: AddRecipient): number {
		return a.date.month - b.date.month || a.date.value - b.date.value || RecipientUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b ? -1 : (a > b) ? 1 : 0;
	}
}