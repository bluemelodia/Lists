import { Topic } from '../../constants/topics';

export enum MenuItems {
    Home = 'Home',
    Activity = 'Activity',
    Calendar = 'Calendar',
    Tasks = 'Tasks',
    Settings = 'Settings'
}

export const MENU = {
    [MenuItems.Home]: {},
    [MenuItems.Activity]: {},
    [MenuItems.Calendar]: {},
    [MenuItems.Tasks]: {
        [Topic.Family]: {},
        [Topic.Finance]: {},
        [Topic.Health]: {},
        [Topic.Hobby]: {},
        [Topic.Home]: {},
        [Topic.Gifts]: {},
        [Topic.Shopping]: {},
        [Topic.Social]: {},
        [Topic.Study]: {},
        [Topic.Travel]: {},
        [Topic.Work]: {}
    },
    [MenuItems.Settings]: {}
};
