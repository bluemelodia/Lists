import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { catchError, filter, finalize, map, take, takeUntil } from 'rxjs/operators';

import { Topic } from '../../../constants/topics.constants';

import { AddMeeting, AddRecipient } from '../../../interfaces/service/service-objects.interface';
import { CalendarType } from '../../../interfaces/calendar/calendar.interface';
import { Calendar, CalendarDay, CalendarWeek } from '../../../interfaces/calendar/calendar-response.interface';
import { noCalMessage } from '../../../interfaces/message.interface';
import { RecipientList } from '../../../interfaces/event/recipient.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { Task } from '../../../interfaces/event/task.interface';

import { CalendarService } from '../../../services/calendar.service';
import { LoadingService } from '../../../services/loading.service';
import { MeetingService } from '../../../services/meeting.service';
import { RecipientService } from '../../../services/recipient.service';
import { TaskService } from '../../../services/task.service';

interface CalendarData {
	calendar: Calendar;
	isError: boolean;
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
		isError: false,
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
		this.getCalendar();
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private setupSubscriptions(): void {
		this.calendar.onCalendarFetched$
			.pipe(
				take(1),
				takeUntil(this.destroyed$),
				map((calendar: Calendar) => {
					if (!calendar) {
						this.emitCalendarError();
					} else {
						this.cal = calendar;
						this.calendarData = JSON.parse(JSON.stringify({
							...this.calendarData,
							isLoading: false,
							isError: false,
							calendar: this.cal,
						}));
						this.calendarData$.next(this.calendarData);
						this.getData();
					}

					return of(null);
				}),
				catchError(() => {
					this.toggleLoading(false);
					return of(null);
				})
			)
			.subscribe();
	}

	public getCalendar(): void {
		this.calendar.getCalendar(this.calendarType);
	}

	public resetCalendar(): void {
		this.setupSubscriptions();
		this.getCalendar();
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
						this.emitCalendarError();
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
				this.calendarData = {
					...this.calendarData,
					isError: false,
				};
				this.calendarData$.next(this.calendarData);
				console.log("===, create schedule");
				this.createSchedule(birthdays, meetings, tasks);
			});
	}

	private emitCalendarError(): void {
		this.calendarData = {
			...this.calendarData,
			isError: true,
		};
		this.calendarData$.next(this.calendarData);
	}

	private createSchedule(birthdays: RecipientList, meetings: AddMeeting[], tasks: Task[]): void {
		this.addBirthdays(birthdays);

		const meetingsList = meetings;
		this.addMeetings(meetingsList);

		const tasksList = tasks;
		this.addTasks(tasksList);

		/* Only emit once the schedule data has been added. */
		this.calendarData$.next(this.calendarData);
	}

	/**
	* Add the birthdays to the schedule. 
	*/
	private addBirthdays(birthdays: RecipientList): void {
		const calendar = this.calendarData.calendar.months;
		console.log("===< birthdays: ", birthdays);

		[...birthdays?.solar, ...birthdays?.lunar].forEach((birthday: AddRecipient) => {
			const month = calendar[this.calendar.getCalendarMonth(birthday.date)];
			month?.weeks?.forEach((week: CalendarWeek) => {
				week.days.forEach((day: CalendarDay) => {
					if (!birthday.lunar && birthday.date.value === day.value) {
						if (!day.schedule) {
							day.schedule = {
								solar: [],
								lunar: [],
								meetings: [],
								tasks: []
							};
						}
						day.schedule.solar.push(birthday);
					} else if (birthday.lunar) {
						const futureDate = birthday.futureDates[month.year];
						if (futureDate.value === day.value) {
							if (!day.schedule) {
								day.schedule = {
									solar: [],
									lunar: [],
									meetings: [],
									tasks: []
								};
							}
							day.schedule.lunar.push(birthday);
						}
					}
				});
			});
		});
	}

	private addMeetings(meetings: AddMeeting[]): void {
		const calendar = this.calendarData.calendar.months;

		meetings.forEach((meeting: AddMeeting) => {
			/* Convert the meeting start date back into a CalendarDay. */
			const month = calendar[this.calendar.getCalendarMonth({
				value: meeting.start_value,
				cmonth: meeting.start_cmonth,
				leap: !!meeting.start_leap,
				cdate: meeting.start_cdate,
				cmonthname: meeting.start_cmonthname,
				month: meeting.start_month,
				year: meeting.start_year,
			})];

			month?.weeks?.forEach((week: CalendarWeek) => {
				week.days.forEach((day: CalendarDay) => {
					if (meeting.start_value === day.value) {
						if (!day.schedule) {
							day.schedule = {
								solar: [],
								lunar: [],
								meetings: [],
								tasks: []
							};
						}
						day.schedule.meetings.push(meeting);
					}
				});
			});
		});
	}

	private addTasks(tasks: Task[]): void {
		const calendar = this.calendarData.calendar.months;

		tasks.forEach((task: Task) => {
			/* Convert the meeting start date back into a CalendarDay. */
			if (task.dueDate?.value) {
				const month = calendar[this.calendar.getCalendarMonth(task.dueDate)];
				month?.weeks?.forEach((week: CalendarWeek) => {
					week.days.forEach((day: CalendarDay) => {
						if (task.dueDate.value === day.value) {
							if (!day.schedule) {
								day.schedule = {
									solar: [],
									lunar: [],
									meetings: [],
									tasks: []
								};
							}
							day.schedule.tasks.push(task);
						}
					});
				});
			}
		});
	}

	private toggleLoading(isLoading: boolean): void {
		this.calendarData.isLoading = isLoading;
		this.calendarData$.next(this.calendarData);
	}
}
