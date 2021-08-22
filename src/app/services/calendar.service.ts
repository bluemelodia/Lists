import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';

import { Endpoint } from '../constants/urls';
import { CalendarType } from '../types/calendar/calendar.types';
import { CalendarYear, Calendar, CalendarMonth } from '../types/calendar/calendar-response.types';
import { Response } from '../types/response.types';
import { CalendarUtils } from '../utils/calendar.utils';

@Injectable({
	providedIn: 'root'
})
export class CalendarService {
	private baseURL = Endpoint.CALENDAR;
	private calendar$ = new BehaviorSubject<Calendar>(null);
	
	private currentYear;
	private currentMonth;
	private currentDay;

	constructor(private http: HttpClient) {
		const today = new Date();
		this.currentYear = today.getFullYear();
		this.currentMonth = today.getMonth() + 1;
		this.currentDay = today.getDate();
	}

	get year(): number {
		return this.currentYear;
	}

	get month(): number {
		return this.currentMonth;
	}

	get day(): number {
		return this.currentDay;
	}

	/**
	 * Lunar-specific logic.
	 */
	get onCalendarFetched$(): Observable<Calendar> {
		return this.calendar$.asObservable();
	}

	/**
	 * We want a two-year calendar, so wait until both requests complete.
	 */
	getCalendar(type: CalendarType) {
		forkJoin({
			[this.currentYear]: this.getChineseCalendarForYear(this.currentYear),
			[this.currentYear + 1]: this.getChineseCalendarForYear(this.currentYear + 1)
		})
		.subscribe((response: Response) => {
			if (!response) {
				this.calendar$.next(null);
				return null;
			}

			const cal = {};

			let calendarYears: CalendarYear[] = [];
			/* The months in chronological order. */
			let calendarMonths: CalendarMonth[] = [];

			/* Separate out the calendars into their respective years. */
			const curCal = response[this.currentYear];
			if (curCal && curCal.statusCode === 0) {
				let calendar = cal[this.currentYear] = CalendarUtils.getParsedCalendar(curCal.responseData);

				calendarYears.push(calendar);
				calendarMonths.push(...calendar.months);
			}

			const nextCal = response[this.currentYear + 1];
			if (nextCal && nextCal.statusCode === 0) {
				let calendar = cal[this.currentYear + 1] = CalendarUtils.getParsedCalendar(nextCal.responseData);
				calendarYears.push(calendar);
				calendarMonths.push(...calendar.months);
			}

			/**
			 * There is no real difference between the solar and lunar data. 
			 * We use the lunar API for both.
			 */
			this.calendar$.next({
				years: calendarYears,
				months: calendarMonths,
				days: CalendarUtils.getCalendarDays(),
				type: type
			});
		});
	}
	
	private getChineseCalendarForYear(year: number): Observable<Response> {
		/*
		* If we've already made a request for the calendar, get the results
		* from the cache. Must be returned as an Observable<Response>.
		*/
		const cachedCalendar = CalendarUtils.getCachedCalendar(year);
		if (cachedCalendar) {
			console.info(`📅 🗃 CalendarService ---> getChineseCalendarForYear, retrieve ${ year } calendar from cache`,);
			return of({
				statusCode: 0,
				responseData: cachedCalendar
			});
		}
		
		let url = `${this.baseURL}/${year}`;
		return this.http.get<Response>(url);
	}
}