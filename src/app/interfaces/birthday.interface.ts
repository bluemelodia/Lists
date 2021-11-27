import { CountryData } from "../constants/countries.constants";
import { CalendarDay } from "./calendar/calendar-response.interface";
import { Phone } from "./phone.interface";
import { AddBirthday } from "./service/service-objects.interface";

export interface Address {
	street: string;
	unit?: string;
	city?: string;
	state?: string;
	zip: string;
	country: CountryData;
}

export interface Birthday {
	name: string;
	uuid?: string; /* Birthdays that came from the DB will already have an id. */
	date: CalendarDay;
	futureDates: CalendarDay[];
	options: BirthdayOptions;
	profile?: BirthdayProfile;
	email?: string;
	phone?: Phone;
	address?: Address;
	budget?: number;
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
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

interface BirthdayFormSubmitAction {
	readonly [key: string]: string;
}

export const BirthdayFormSubmitActions: BirthdayFormSubmitAction = {
	[BirthdayAction.Add]: "Submit",
	[BirthdayAction.Edit]: "Update"
}

/**
* Actions to perform on the recipient"s birthday (user-selected). 
*/
export enum BirthdayID {
	call = "call",
	text = "text",
	gift = "gift",
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