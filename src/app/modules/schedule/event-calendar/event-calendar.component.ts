import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { of, ReplaySubject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { Topic } from '../../../constants/topics.constants';

import { CalendarType } from '../../../interfaces/calendar/calendar.interface';
import { Calendar } from '../../../interfaces/calendar/calendar-response.interface';
import { noCalMessage } from '../../../interfaces/message.interface';

import { CalendarService } from '../../../services/calendar.service';

interface CalendarData {
	calendar: Calendar;
	isLoading: boolean;
	showCal: boolean;
}

@Component({
	selector: 'app-event-calendar',
	templateUrl: './event-calendar.component.html',
	styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit, OnDestroy {
	@Input() calendarType: CalendarType = CalendarType.Schedule;
	@Input() topic: Topic;

	public noCalMessage = noCalMessage;
	public cal: Calendar;

	private uuid = UUID.UUID();
	public calendarId = `ml-calendar-${this.uuid}`;

	private calendarData: CalendarData = {
		isLoading: false,
		calendar: null,
		showCal: false,
	};
	private calendarData$ = new ReplaySubject<CalendarData>();
	public calendar$ = this.calendarData$.asObservable();

	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

	constructor(
		private readonly calendar: CalendarService,
	) { }

	public ngOnInit(): void {
		this.setupSubscriptions();
		this.calendar.getCalendar(this.calendarType);
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private setupSubscriptions(): void {
		this.calendar.onCalendarFetched$
			.pipe(
				takeUntil(this.destroyed$),
				map((calendar: Calendar) => {
					if (!calendar) {
						throw new Error('Unable to fetch calendar.');
					}

					this.cal = calendar;
					this.calendarData = {
						...this.calendarData,
						isLoading: false,
						calendar: this.cal,
					};
					this.calendarData$.next(this.calendarData);
					return of(null);
				}),
				catchError(() => {
					this.toggleLoading(false);
					return of(null);
				})
			)
			.subscribe();
	}

	private toggleLoading(isLoading: boolean): void {
		this.calendarData.isLoading = isLoading;
		this.calendarData$.next(this.calendarData);
	}
}
