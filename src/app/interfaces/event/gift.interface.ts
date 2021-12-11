import { FormSubmitAction } from "./event.interface";

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