import { Event } from "../../../constants/events.contants";
import { Topic } from "../../../constants/topics.constants";

export enum MenuItem {
	Home = "Home",
	AddEvent = "Create",
	Calendar = "Calendar",
	Tasks = "Lists",
	Settings = "Settings"
}

/**
 * Impose order on the menu items.
 */
export const MENU_LIST: MenuItem[] = [
	MenuItem.Home,
	MenuItem.Calendar,
	MenuItem.AddEvent,
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
		route: "/birthdays",
		title: "Birthdays"
	},
	[Topic.Meetings]: {
		route: "/meetings",
		title: "Meetings"
	},
	[Topic.Gifts]: {
		route: "/gifts",
		title: "Gifts"
	},
	[Topic.Projects]: {
		route: "/projects",
		title: "Projects"
	},
};

const TOPIC_LIST: Topic[] = [
	Topic.Birthdays,
	Topic.Gifts,
	Topic.Meetings,
	Topic.Projects,
];

const EVENTS: IMenu = {
	[Event.Birthday]: {
		route: "events/add-birthday",
		title: "Add Recipient"
	},
	[Event.Gift]: {
		route: "events/add-gift",
		title: "Add Gift"
	},
	[Event.Meeting]: {
		route: "events/add-meeting",
		title: "Add Meeting"
	},
	[Event.Task]: {
		route: "events/add-task",
		title: "Add Task"
	},
};

const EVENT_LIST: Event[] = [
	Event.Birthday,
	Event.Gift,
	Event.Meeting,
	Event.Task
];

export const MENU: IMenu = {
	[MenuItem.Home]: {
		route: "/home",
		title: "Home"
	},
	[MenuItem.AddEvent]: {
		route: "",
		subMenu: EVENTS,
		subMenuList: EVENT_LIST,
		expanded: false,
	},
	[MenuItem.Calendar]: {
		route: "/calendar",
		title: "Calendar"
	},
	[MenuItem.Tasks]: {
		route: "",
		subMenu: TOPICS,
		subMenuList: TOPIC_LIST,
		expanded: false,
	},
	[MenuItem.Settings]: {
		route: "/settings",
		title: "Settings"
	}
};
