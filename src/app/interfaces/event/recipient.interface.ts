import { CountryData } from "../../constants/countries.constants";
import { CalendarDay } from "../calendar/calendar-response.interface";
import { EventImage, FormSubmitAction } from "./event.interface";
import { Phone } from "../phone.interface";
import { AddRecipient } from "../service/service-objects.interface";

export interface Address {
	street: string;
	unit?: string;
	city?: string;
	state?: string;
	zip: string;
	country: CountryData;
}

export interface FutureDates {
	[key: string]: CalendarDay;
}

export interface Recipient {
	name: string;
	uuid?: string; /* Recipients that came from the DB will already have an id. */
	date: CalendarDay;
	futureDates: FutureDates;
	options: RecipientOptions;
	profile?: EventImage;
	email?: string;
	phone?: Phone;
	address?: Address;
	budget?: number;
}

export interface RecipientList {
	list: AddRecipient[],
	solar: AddRecipient[],
	lunar: AddRecipient[],
}

export interface RecipientConfig {
	action: RecipientAction,
	buttonAction: string,
}

export enum RecipientAction {
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

export const RecipientFormSubmitActions: FormSubmitAction = {
	[RecipientAction.Add]: "Submit",
	[RecipientAction.Edit]: "Update"
}

/**
* Actions to perform on the recipient"s recipient (user-selected). 
*/
export enum RecipientID {
	call = "call",
	text = "text",
	gift = "gift",
}

export interface RecipientOptions {
	lunar: boolean;
	[RecipientID.call]: boolean;
	[RecipientID.text]: boolean;
	[RecipientID.gift]: boolean;
}
