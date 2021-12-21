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
	[Event.Recipient]: {
		header: 'No Birthdays Found',
		actionText: 'Add Birthdays',
		body: 'You do not currently have any upcoming birthdays.',
		route: '/events/add-recipient'
	},
	[Event.Meeting]: {
		header: 'No Meetings Found',
		actionText: 'Add Meeting',
		body: 'You do not currently have any upcoming meetings.',
		route: '/events/add-meeting'
	},
	[Event.Gift]: {
		header: 'No Gifts Found',
		actionText: 'Add Gift',
		body: 'You have not logged any gifts.',
		route: '/events/add-gift'
	}
}
