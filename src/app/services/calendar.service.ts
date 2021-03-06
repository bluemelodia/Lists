import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, of, ReplaySubject, } from "rxjs";

import { Endpoint } from "../constants/urls.constants";
import { CalendarType } from "../interfaces/calendar/calendar.interface";
import { CalendarYear, Calendar, CalendarMonth, CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { Response } from "../interfaces/response.interface";
import { CalendarUtils } from "../utils/calendar.utils";

@Injectable({
	providedIn: "root"
})
export class CalendarService {
	private baseURL = Endpoint.CALENDAR;
	private calendar$ = new ReplaySubject<Calendar>();

	private currentYear: number;
	private currentMonth: number;
	private currentDay: number;

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

	get onCalendarFetched$(): Observable<Calendar> {
		return this.calendar$.asObservable();
	}

	/**
	 * We want a two-year calendar, so wait until both requests complete.
	 */
	public getCalendar(type: CalendarType): void {		
		forkJoin({
			[this.currentYear]: this.getChineseCalendarForYear(this.currentYear),
			[this.currentYear + 1]: this.getChineseCalendarForYear(this.currentYear + 1)
		})
			.subscribe((response: Response) => {
				if (!response) {
					throw new Error("Unable to load calendar.")
				}

				const cal = {};

				const calendarYears: CalendarYear[] = [];
				/* The months in chronological order. */
				const calendarMonths: CalendarMonth[] = [];

				/* Separate out the calendars into their respective years. */
				const curCal = response[this.currentYear] as Response;
				if (curCal && curCal.statusCode === 0) {
					const calendar = cal[this.currentYear] = CalendarUtils.getParsedCalendar(curCal.responseData);

					calendarYears.push(calendar);
					calendarMonths.push(...calendar.months);
				}

				const nextCal = response[this.currentYear + 1] as Response;
				if (nextCal && nextCal.statusCode === 0) {
					const calendar = cal[this.currentYear + 1] = CalendarUtils.getParsedCalendar(nextCal.responseData);
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
			}, () => {
				console.log("===> cal next is null");
				this.calendar$.next(null);
				return of(null);
			});
	}

	public getCalendarMonth(day: CalendarDay): number {
		if (this.year == day.year) {
			return day.month - 1;
		} else {
			return 12 + day.month - 1;
		}
	}

	private getChineseCalendarForYear(year: number): Observable<Response> {
		/*
		* If we"ve already made a request for the calendar, get the results
		* from the cache. Must be returned as an Observable<Response>.
		*/
		const cachedCalendar = CalendarUtils.getCachedCalendar(year);
		if (cachedCalendar) {
			console.info(`[Calendar Service] Get Chinese calendar, retrieve ${year} calendar from cache`,);
			return of({
				statusCode: 0,
				responseData: cachedCalendar
			});
		}

		const url = `${this.baseURL}/${year}`;
		return this.http.get<Response>(url);
	}
}