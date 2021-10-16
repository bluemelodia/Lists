import { DateStatus } from "../date.interface";

export interface AddDate {
	cdate: number;
	cmonth: number;
	month: number;
	date: number;
	year: number;
	leap: number;
	cmonthname: string;
	value?: number;
}

export interface AddRecurrence {
	optionName: string;
	optionValue: string;
	optionSelected: number;
}

/**
* Format of birthday to send to the service.
*/
export interface AddBirthday extends AddDate {
	id: string;
	uuid: string;
	name: string;
	call: number;
	text: number;
	gift: number;
	lunar: number;
	status?: DateStatus;
	image?: string;
	filename?: string;
}

/**
* Format of meeting to send to the service.
*/
export interface AddMeeting extends AddDate, AddRecurrence {
	id: string;
	uuid?: string;
	description?: string;
	location: string;
	virtual?: number;
	name: string;
}