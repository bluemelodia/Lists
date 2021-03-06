import { Recipient } from "../event/recipient.interface";
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

export interface AddStartDate {
	start_cdate: number;
	start_cmonth: number;
	start_month: number;
	start_date: number;
	start_year: number;
	start_leap: number;
	start_cmonthname: string;
	start_value?: number;
}

export interface AddEndDate {
	end_cdate: number;
	end_cmonth: number;
	end_month: number;
	end_date: number;
	end_year: number;
	end_leap: number;
	end_cmonthname: string;
	end_value?: number;
}

export interface AddStartTime {
	start_hour: number;
	start_minute: number;
}

export interface AddEndTime {
	end_hour: number;
	end_minute: number;
}

export interface AddRecipient extends Recipient {
	id: string;
	lunar: number;
	leap: number;
	status?: DateStatus;
	image?: string;
	filename?: string;
}

/**
* Format of meeting to send to the service.
*/
export interface AddMeeting extends AddStartDate, AddEndDate, AddStartTime, AddEndTime {
	id: string;
	uuid?: string;
	description?: string;
	location: string;
	status?: DateStatus;
	virtual?: number;
	name: string;
}