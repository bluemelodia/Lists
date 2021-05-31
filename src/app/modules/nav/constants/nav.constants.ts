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
        route: ''
    },
    [Topic.Finance]: {
        route: ''
    },
    [Topic.Health]: {
        route: ''
    },
    [Topic.Hobby]: {
        route: ''
    },
    [Topic.Home]: {
        route: ''
    },
    [Topic.Gifts]: {
        route: ''
    },
    [Topic.Shopping]: {
        route: ''
    },
    [Topic.Social]: {
        route: ''
    },
    [Topic.Study]: {
        route: ''
    },
    [Topic.Travel]: {
        route: ''
    },
    [Topic.Work]: {
        route: ''
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
        route: ''
    },
    [MenuItem.Activity]: {
        route: ''
    },
    [MenuItem.Calendar]: {
        route: ''
    },
    [MenuItem.Tasks]: {
        route: '',
        subMenu: TOPICS,
        subMenuList: TOPIC_LIST,
        expanded: false,  
    },
    [MenuItem.Settings]: {
        route: ''
    }
};
