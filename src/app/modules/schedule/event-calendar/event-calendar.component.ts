import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, map, take, takeUntil } from 'rxjs/operators';

import { Topic } from '../../../constants/topics.constants';

import { AddMeeting, AddRecipient } from '../../../interfaces/service/service-objects.interface';
import { CalendarType } from '../../../interfaces/calendar/calendar.interface';
import { Calendar, CalendarDay, CalendarMonth, CalendarWeek } from '../../../interfaces/calendar/calendar-response.interface';
import { noCalMessage } from '../../../interfaces/message.interface';
import { RecipientList } from '../../../interfaces/event/recipient.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { Task } from '../../../interfaces/event/task.interface';

import { CalendarService } from '../../../services/calendar.service';
import { LoadingService } from '../../../services/loading.service';
import { MeetingService } from '../../../services/meeting.service';
import { RecipientService } from '../../../services/recipient.service';
import { TaskService } from '../../../services/task.service';

import { RecipientUtils } from '../../../utils/recipient.utils';
import { TaskUtils } from '../../../utils/task.utils';
import { DataType } from 'ajv/dist/compile/validate/dataType';

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
		private loadingService: LoadingService,
		private meetingService: MeetingService,
		private recipientService: RecipientService,
		private tasksService: TaskService,
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

					this.getData();

					return of(null);
				}),
				catchError(() => {
					this.toggleLoading(false);
					return of(null);
				})
			)
			.subscribe();
	}

	public getData(): void {
		this.toggleLoading(true);

		forkJoin([
			this.recipientService.getRecipients(),
			this.meetingService.getMeetings(),
			this.tasksService.getTasks()
		])
			.pipe(
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						// TODO: don't show dialog here, instead show error message
					}
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.toggleLoading(false);
				}),
				take(1),
				takeUntil(this.destroyed$)
			)
			.subscribe(([birthdays, meetings, tasks]) => {
				this.createSchedule(birthdays, meetings, tasks);
			});
	}

	private createSchedule(birthdays: RecipientList, meetings: AddMeeting[], tasks: Task[]): void {
		const calendar = this.calendarData.calendar.months;

		const solar = RecipientUtils.getSummary(birthdays?.solar);
		solar.forEach((birthday: AddRecipient) => {
			const month = calendar[this.calendar.getCalendarMonth(birthday.date)];
			month.weeks.forEach((week: CalendarWeek) => {
				week.days.forEach((day: CalendarDay) => {
					if (birthday.date.value === day.value) {
						if (!day.schedule) {
							day.schedule = {
								solar: [],
								lunar: [],
								meetings: [],
								tasks: []
							};
						}
						day.schedule.solar.push(birthday);
					}
				});
			});
		});
		console.log("===> solar: ", calendar);

		const lunar = RecipientUtils.getSummary(birthdays?.lunar);

		const meetingsList = meetings;
		const tasksList = TaskUtils.getSummary(tasks);

		console.log("Calendar: ", this.calendarData);
		console.log("Solar: ", solar, lunar, meetingsList, tasksList);
	}



	private toggleLoading(isLoading: boolean): void {
		this.calendarData.isLoading = isLoading;
		this.calendarData$.next(this.calendarData);
	}
}
