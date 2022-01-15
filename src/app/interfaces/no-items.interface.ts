import { Event } from "../constants/events.contants";
import { Topic } from "../constants/topics.constants";

import { GiftAction } from "./event/gift.interface";
import { MeetingAction } from "./event/meeting.interface";
import { RecipientAction } from "./event/recipient.interface";
import { TaskAction } from "./event/task.interface";

export interface NoItemConfig {
	readonly [key: string]: NoItem;
}

export interface NoItem {
	action: GiftAction | MeetingAction | RecipientAction | TaskAction,
	actionText: string,
	body: string,
	header: string,
	route: string,
	topic: Topic,
}

export const NO_ITEMS_CONFIG: NoItemConfig = {
	[Event.Recipient]: {
		action: RecipientAction.Add,
		actionText: 'Add Birthdays',
		body: 'You do not currently have any upcoming birthdays.',
		header: 'No Birthdays Found',
		route: '/events/add-recipient',
		topic: Topic.Birthdays,
	},
	[Event.Meeting]: {
		action: MeetingAction.Add,
		actionText: 'Add Meeting',
		body: 'You do not currently have any upcoming meetings.',
		header: 'No Meetings Found',
		route: '/events/add-meeting',
		topic: Topic.Meetings,
	},
	[Event.Gift]: {
		action: GiftAction.Add,
		actionText: 'Add Gift',
		body: 'You have not logged any gifts.',
		header: 'No Gifts Found',
		route: '/events/add-gift',
		topic: Topic.Gifts,
	},
	[Event.Task]: {
		action: TaskAction.Add,
		actionText: 'Add Task',
		body: 'You have not added any tasks.',
		header: 'No Tasks Found',
		route: '/events/add-task',
		topic: Topic.Tasks,
	}
}
