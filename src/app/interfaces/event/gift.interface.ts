import { EventImage, FormSubmitAction, SortOption } from "./event.interface";
import { Recipient } from "./recipient.interface";

import { Occasion } from "../../constants/occasions.constants";

export interface Gift {
	recipientId: string;
	uuid: string;
	occasion: Occasion;
	year: number;
	giftImage?: EventImage;
	description: string;
	price: number;
}

export interface AddGift extends Gift {
	id: string;
	image?: string;
	filename?: string;
}

export interface GiftDetails extends Gift {
	recipient: Recipient
}

export enum GiftField {
	Budget = 'price',
	Occasion = 'occasion',
	RecipientName = 'recipient.name',
	Year = 'year',
}

export const GiftSortOptions: SortOption[] = [
	{
		displayName: 'Recipient Name',
		fieldName: GiftField.RecipientName,
	},
	{
		displayName: 'Occasion',
		fieldName: GiftField.Occasion,
	},
	{
		displayName: 'Price',
		fieldName: GiftField.Budget,
	},
	{
		displayName: 'Year Gifted',
		fieldName: GiftField.Year,
	},
];

export interface GiftConfig {
	action: GiftAction,
	buttonAction: string,
}

export enum GiftAction {
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

export const GiftFormSubmitActions: FormSubmitAction = {
	[GiftAction.Add]: "Submit",
	[GiftAction.Edit]: "Update"
}