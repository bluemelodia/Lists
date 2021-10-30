import { Event } from "../constants/events.contants";

export interface NoItemConfig {
	readonly [key: string]: NoItem;
}
export interface NoItem {
	header: string,
	actionText: string,
	body: string,
	route: string
};

export const NO_ITEMS_CONFIG: NoItemConfig = {
	[Event.Birthday]: {
		header: 'No Birthdays Found',
		actionText: 'Add Birthday',
		body: 'You do not currently have any upcoming birthdays.',
		route: '/events/add-birthday'
	},
	[Event.Meeting]: {
		header: 'No Meetings Found',
		actionText: 'Add Meeting',
		body: 'You do not currently have any upcoming meetings.',
		route: '/events/add-meeting'
	}
}
