/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CalendarMonth, CalendarWeek, CalendarDay, CalendarYear, CalendarKey } from "../interfaces/calendar/calendar-response.interface";

export class CalendarUtils {
	/*
	* Cache calendar years that were previously fetched from the service, to save time
	* and processing for subsequent requests.
	*/
	private static cache = {};
	private static calendarDays: CalendarDay[] = [];

	private static cacheCalendar(year: number, calendar: CalendarYear): void {
		CalendarUtils.cache[year] = calendar;
	}

	public static getCachedCalendar(year: number): CalendarYear {
		return CalendarUtils.cache[year] as CalendarYear;
	}

	public static getCalendarDays(): CalendarDay[] {
		return this.calendarDays;
	}

	private static isLeapYear(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	public static getParsedCalendar(calendar: any): CalendarYear {
		try {
			/* Already parsed. */
			if (calendar.year && calendar.months) {
				return calendar as CalendarYear;
			}

			const calJSON = JSON.parse(calendar);
			const year = calJSON[CalendarKey.Year];
			const calYear = year.$.value;
			const months = CalendarUtils.parseMonths(year[CalendarKey.Month], calYear);

			const cal: CalendarYear = {
				year: Number(calYear),
				months: months
			};
			
			CalendarUtils.cacheCalendar(calYear, cal);
			return cal;
		} catch (error) {
			console.info(`[Calendar Utils] Unable to generate calendar: `, error);
			return null;
		}
	}

	/* 
	* Date references are much easier if you add the year field to each month.
	*/
	private static parseMonths(monthJSON: any, year: number): CalendarMonth[] {
		const months = [];
		for (const monthObj of monthJSON) {
			const month = monthObj.$;
			const weeks = CalendarUtils.parseWeek(monthObj[CalendarKey.Week], month.value, year);
			months.push({
				cname: month.cname,
				name: month.name,
				value: Number(month.value),
				weeks: weeks,
				year: Number(year)
			});
		}
		return months as CalendarMonth[];
	}

	private static parseWeek(weekJSON: any, month: number, year: number): CalendarWeek[] {
		const week = [];
		for (const weekObj of weekJSON) {
			const days = CalendarUtils.parseDays(weekObj[CalendarKey.Day], month, year);
			week.push({
				days: days
			});
		}
		return week as CalendarWeek[];
	}

	private static parseDays(daysJSON: any, month: number, year: number): CalendarDay[] {
		const days = [];
		for (const dayObj of daysJSON) {
			const day = dayObj.$;
			if (day) {
				const calendarDay: CalendarDay = {
					value: Number(day.value),
					cmonth: Number(day.cmonth),
					leap: day.leap ? true : false,
					cdate: Number(day.cdate),
					cmonthname: day.cmonthname,
					month: Number(month),
					year: Number(year),
				};
				days.push(calendarDay);
				CalendarUtils.calendarDays.push(calendarDay);
			} else {
				days.push({
					value: -1
				});
			}
		}
		return days as CalendarDay[];
	}
}