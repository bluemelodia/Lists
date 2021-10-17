import { CalendarDay } from "./calendar/calendar-response.interface";
import { Option } from "./event.interface";

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
	recurring: Option;
	startDate: CalendarDay;
	endDate: CalendarDay;
	startHour: number;
	startMinute: number;
	endHour: number;
	endMinute: number;
}

export enum MeetingAction {
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

interface MeetingFormSubmitAction {
	readonly [key: string]: string;
}

export const MeetingFormSubmitActions: MeetingFormSubmitAction = {
	[MeetingAction.Add]: "Submit",
	[MeetingAction.Edit]: "Update"
}