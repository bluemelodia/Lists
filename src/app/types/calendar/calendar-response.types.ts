import { CalendarType } from './calendar.types';

export enum CalendarKey {
    Year = "ccal:year",
    Month = "ccal:month",
    Week = "ccal:week",
    Day = "ccal:day"
}

/*
* Return the calendar in years and months for easier parsing.
*/
export interface Calendar {
    years: CalendarYear[],
    months: CalendarMonth[],
    days: CalendarDay[],
    type: CalendarType
}

export interface CalendarYear {
    year : number,
    months: CalendarMonth[]
}

export interface CalendarMonth {
    cname: string,
    name: string,
    value: number,
    weeks: CalendarWeek[],
    year: number
}

export interface CalendarWeek {
    days: CalendarDay[]
}

export interface CalendarDay {
    value: number, 
    cmonth?: number,
    leap?: boolean,
    cdate?: number,
    cmonthname?: string,
    month: number,
    year: number,
}
