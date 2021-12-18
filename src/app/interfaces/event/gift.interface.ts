import { EventImage, FormSubmitAction } from "./event.interface";
import { Recipient } from "./recipient.interface";

import { Occasion } from "../../constants/occasions.constants";

export interface Gift {
	recipient: Recipient;
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