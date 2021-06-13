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

interface IMenuDetails {
    route: string;
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
const TOPICS: IMenu = {
    [Topic.Family]: {
        route: '/family'
    },
    [Topic.Finance]: {
        route: '/finance'
    },
    [Topic.Health]: {
        route: '/health'
    },
    [Topic.Hobby]: {
        route: '/hobby'
    },
    [Topic.Home]: {
        route: '/home'
    },
    [Topic.Gifts]: {
        route: '/gifts'
    },
    [Topic.Shopping]: {
        route: '/shopping'
    },
    [Topic.Social]: {
        route: '/social'
    },
    [Topic.Study]: {
        route: '/study'
    },
    [Topic.Travel]: {
        route: '/travel'
    },
    [Topic.Work]: {
        route: '/work'
    }
};

const TOPIC_LIST: Topic[] = [
    Topic.Family,
    Topic.Finance,
    Topic.Health,
    Topic.Hobby,
    Topic.Home,
    Topic.Gifts,
    Topic.Shopping,
    Topic.Social,
    Topic.Study,
    Topic.Travel,
    Topic.Work,
];

const EVENTS: IMenu = {
    [Event.Birthday]: {
        route: '/add-birthday'
    },
};

const EVENT_LIST: Event[] = [
    Event.Birthday,
];

export const MENU: IMenu = {
    [MenuItem.Home]: {
        route: '/home'
    },
    [MenuItem.Activity]: {
        route: '/activity'
    },
    [MenuItem.AddEvent]: {
        route: '',
        subMenu: EVENTS,
        subMenuList: EVENT_LIST,
        expanded: false,
    },
    [MenuItem.Calendar]: {
        route: '/calendar'
    },
    [MenuItem.Tasks]: {
        route: '',
        subMenu: TOPICS,
        subMenuList: TOPIC_LIST,
        expanded: false,  
    },
    [MenuItem.Settings]: {
        route: '/settings'
    }
};
