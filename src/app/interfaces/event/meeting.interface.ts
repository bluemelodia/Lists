import { CalendarDay } from "../calendar/calendar-response.interface";
import { FormSubmitAction } from "./event.interface";

export interface MeetingConfig {
	action: MeetingAction,
	buttonAction: string,
}

export interface Meeting {
	id?: string;
	uuid?: string;
	description?: string;
	location: string;
	virtual?: boolean;
	name: string;
	startDate: CalendarDay;
	endDate: CalendarDay;
	startTime: string;
	endTime: string;
}

export enum MeetingAction {
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

export const MeetingFormSubmitActions: FormSubmitAction = {
	[MeetingAction.Add]: "Submit",
	[MeetingAction.Edit]: "Update"
}