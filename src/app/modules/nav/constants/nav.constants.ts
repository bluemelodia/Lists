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
export const MENU = [
    [MenuItem.Home],
    [MenuItem.Activity],
    [MenuItem.Calendar],
    [MenuItem.Tasks],
    [MenuItem.Settings],
];

interface IMenuDetails {
    route: string;
    submenu?: IMenu;
    expanded?: boolean;
};

export interface IMenu {
    readonly [key: string]: IMenuDetails;
}

const TOPIC_ITEMS: IMenu = {
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

export const MENU_ITEMS: IMenu = {
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
        submenu: TOPIC_ITEMS,
        expanded: false,  
    },
    [MenuItem.Settings]: {
        route: ''
    }
};
