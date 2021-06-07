import { Topic } from '../../../constants/topics';

export enum MenuItem {
    Home = 'Home',
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
    MenuItem.Activity,
    MenuItem.Calendar,
    MenuItem.Tasks,
    MenuItem.Settings,
];

interface IMenuDetails {
    route: string;
    subMenu?: IMenu;
    subMenuList?: Topic[];
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

export const MENU: IMenu = {
    [MenuItem.Home]: {
        route: '/home'
    },
    [MenuItem.Activity]: {
        route: '/activity'
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
