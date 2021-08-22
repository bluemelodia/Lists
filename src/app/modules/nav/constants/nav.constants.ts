import { Event } from '../../../constants/events';
import { Topic } from '../../../constants/topics';

export enum MenuItem {
    Home = 'Home',
    AddEvent = "Add Event",
    Activity = 'Activity',
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
    MenuItem.Activity,
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
};

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
    [Topic.Career]: {
        route: '/career',
        title: 'Career'
    },
    [Topic.Family]: {
        route: '/family',
        title: 'Family'
    },
    [Topic.Finance]: {
        route: '/finance',
        title: 'Finances'
    },
    [Topic.Health]: {
        route: '/health',
        title: 'Health'
    },
    [Topic.Social]: {
        route: '/social',
        title: 'Social'
    },
    [Topic.Travel]: {
        route: '/travel',
        title: 'Travel'
    }
};

const TOPIC_LIST: Topic[] = [
    Topic.Birthdays,
    Topic.Career,
    Topic.Family,
    Topic.Finance,
    Topic.Health,
    Topic.Social,
    Topic.Travel,
];

const EVENTS: IMenu = {
    [Event.Birthday]: {
        route: 'events/add-birthday',
        title: 'Add Birthday'
    },
};

const EVENT_LIST: Event[] = [
    Event.Birthday,
];

export const MENU: IMenu = {
    [MenuItem.Home]: {
        route: '/home',
        title: 'Home'
    },
    [MenuItem.Activity]: {
        route: '/activity',
        title: 'Activity'
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
