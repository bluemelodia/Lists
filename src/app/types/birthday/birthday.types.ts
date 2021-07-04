import { SelectedDay } from "../calendar/calendar-response.types";
import { BirthdayID } from "../event.types";

export interface Birthday {
	name: string;
	date: SelectedDay;
	options: BirthdayOptions;
}

export interface BirthdayOptions {
	lunar: boolean;
	[BirthdayID.call]: boolean;
	[BirthdayID.text]: boolean;
	[BirthdayID.gift]: boolean;
}