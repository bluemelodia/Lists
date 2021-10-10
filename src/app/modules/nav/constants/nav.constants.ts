import { Event } from '../../../constants/events.contants';
import { Topic } from '../../../constants/topics.constants';

export enum MenuItem {
	Home = 'Home',
	AddEvent = "Add Events and Reminders",
	Calendar = 'Calendar',
	Tasks = 'Tasks',
	Settings = 'Settings'
}

/**
 * Impose order on the menu items.
 */
export const MENU_LIST: MenuItem[] = [
	MenuItem.Home,
	MenuItem.AddEvent,
	MenuItem.Calendar,
	MenuItem.Tasks,
	MenuItem.Settings,
];

export interface IMenuDetails {
	route: string;
	title?: string;
	subMenu?: IMenu;
	subMenuList?: Topic[] | Event[];
	expanded?: boolean;
}

export interface IMenu {
	readonly [key: string]: IMenuDetails;
}

/**
 * The topics submenu under Tasks.
 */
export const TOPICS: IMenu = {
	[Topic.Birthdays]: {
		route: '/birthdays',
		title: 'Birthdays'
	},
	[Topic.Meetings]: {
		route: '/meetings',
		title: 'Meetings'
	},
	[Topic.Payments]: {
		route: '/payments',
		title: 'Payments'
	},
	[Topic.Projects]: {
		route: '/projects',
		title: 'Projects'
	},
};

const TOPIC_LIST: Topic[] = [
	Topic.Birthdays,
	Topic.Meetings,
	Topic.Payments,
	Topic.Projects,
];

const EVENTS: IMenu = {
	[Event.Birthday]: {
		route: 'events/add-birthday',
		title: 'Add Birthday'
	},
	[Event.Meeting]: {
		route: 'events/add-meeting',
		title: 'Add Meeting'
	},
	[Event.Payment]: {
		route: 'events/add-birthday',
		title: 'Add Payment'
	},
	[Event.Task]: {
		route: 'events/add-birthday',
		title: 'Add Task'
	},
};

const EVENT_LIST: Event[] = [
	Event.Birthday,
	Event.Meeting,
	Event.Payment,
	Event.Task
];

export const MENU: IMenu = {
	[MenuItem.Home]: {
		route: '/home',
		title: 'Home'
	},
	[MenuItem.AddEvent]: {
		route: '',
		subMenu: EVENTS,
		subMenuList: EVENT_LIST,
		expanded: false,
	},
	[MenuItem.Calendar]: {
		route: '/calendar',
		title: 'Calendar'
	},
	[MenuItem.Tasks]: {
		route: '',
		subMenu: TOPICS,
		subMenuList: TOPIC_LIST,
		expanded: false,
	},
	[MenuItem.Settings]: {
		route: '/settings',
		title: 'Settings'
	}
};
