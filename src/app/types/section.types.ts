import { CalendarType } from './calendar/calendar.types';

export enum SectionType {
    Home,
    Calendar,
    AddSolar,
    AddLunar,
    Presents,
    GiftIdeas
}

/* Types related to navigation. */
export interface NavItem {
    route: string,
    routeParams?: unknown,
    title: string
}

/* Imposes order in the navigation links. */
export const navigationLinks = [
	SectionType.Home,
	SectionType.Calendar,
	SectionType.AddSolar,
	SectionType.AddLunar,
	SectionType.Presents,
	SectionType.GiftIdeas
];

const siteMap = {
	[SectionType.Home]: { 
		route: 'home',
		title: 'Home'
	},
	[SectionType.Calendar]: { 
		route: 'calendar',
		title: 'Calendar'
	},
	[SectionType.AddSolar]: {
		route: 'add-solar',
		routeParams: { cal: CalendarType.Solar },
		title: 'Add Solar Event'
	},
	[SectionType.AddLunar]: {
		route: 'add-lunar',
		routeParams: { cal: CalendarType.Lunar },
		title: 'Add Lunar Event',
	},
	[SectionType.Presents]: { 
		route: 'presents',
		title: 'Presents'
	},
	[SectionType.GiftIdeas]: {
		route: 'gift',
		title: 'Gift Ideas'
	},
};

export function navInfoForType(type: SectionType): NavItem {
	return siteMap[type];
}