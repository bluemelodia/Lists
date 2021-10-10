import { CalendarDay } from "./calendar/calendar-response.interface";
import { Option } from "./event.interface";

export interface MeetingConfig {
	action: MeetingAction,
	buttonAction: string,
}

export interface Meeting {
	uuid?: string;
	description?: string;
	location: string;
	virtual?: boolean;
	name: string;
	recurring: Option;
	time: CalendarDay;
}

/**
* Format of meeting to send to the service.
*/
export interface AddMeeting {
	uuid?: string;
	description?: string;
	location: string;
	virtual?: number;
	name: string;
	recurring: string;
	time: string;
}

export enum MeetingAction {
	Add = 'Add',
	Delete = 'Delete',
	Edit = 'Edit',
	Fetch = 'Fetch',
}

interface MeetingFormSubmitAction {
	readonly [key: string]: string;
}

export const MeetingFormSubmitActions: MeetingFormSubmitAction = {
	[MeetingAction.Add]: 'Submit',
	[MeetingAction.Edit]: 'Update'
}