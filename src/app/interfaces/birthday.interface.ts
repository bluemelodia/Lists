import { CalendarDay } from "./calendar/calendar-response.interface";
import { DateStatus } from "./date.interface";

export interface Birthday {
	name: string;
	uuid?: string; /* Birthdays that came from the DB will already have an id. */
	date: CalendarDay;
	options: BirthdayOptions;
	profile?: BirthdayProfile;
}

/**
* Format of birthday to send to the service.
*/
export interface AddBirthday {
	id: string;
	uuid: string;
	cmonth: number;
	month: number;
	cdate: number;
	date: number;
	year: number;
	name: string;
	call: number;
	text: number;
	gift: number;
	leap: number;
	cmonthname: string;
	lunar: number;
	status?: DateStatus;
	image?: string;
	filename?: string;
}

export interface BirthdayList {
	list: AddBirthday[],
	solar: AddBirthday[],
	lunar: AddBirthday[],
}

export interface BirthdayConfig {
	action: BirthdayAction,
	buttonAction: string,
}

export enum BirthdayAction {
	Add = 'Add',
	Delete = 'Delete',
	Edit = 'Edit',
	Fetch = 'Fetch',
}

interface BirthdayFormSubmitAction {
	readonly [key: string]: string;
}

export const BirthdayFormSubmitActions: BirthdayFormSubmitAction = {
	[BirthdayAction.Add]: 'Submit',
	[BirthdayAction.Edit]: 'Update'
}

/**
* Actions to perform on the recipient's birthday (user-selected). 
*/
export enum BirthdayID {
	call = "call",
	text = "text",
	gift = "buy-present",
}

export interface BirthdayOptions {
	lunar: boolean;
	[BirthdayID.call]: boolean;
	[BirthdayID.text]: boolean;
	[BirthdayID.gift]: boolean;
}

/**
* Personalizable image for each recipient. 
*/
export interface BirthdayProfile {
	fileName: string;
	image: string;
}