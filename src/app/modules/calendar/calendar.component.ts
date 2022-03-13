import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

import { Topic } from "../../constants/topics.constants";

import { CalendarType, shortMonths } from "../../interfaces/calendar/calendar.interface";
import { Calendar, CalendarDay, CalendarMonth } from "../../interfaces/calendar/calendar-response.interface";

import { CalendarService } from "../../services/calendar.service";

@Component({
	selector: "ml-calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@HostBinding("class.fullscreen") public fullScreen = false;

	@Input() set type(type: CalendarType) {
		this.fullScreen = type === CalendarType.Schedule;
		this.calendarType = type;
	}
	public calendarType: CalendarType;

	@Input() topic: Topic;
	@Input() set selectedDay(selected: CalendarDay) {
		/* If user selected a date, open the calendar to the selected month. */
		if (selected) {
			this.monthIdx = this.cal.months.findIndex((month) =>
				month.value === selected.month);
			this.month = this.cal.months[this.monthIdx];
			this.selectedDate = selected;
		}
	}
	public selectedDate: CalendarDay;

	@Input() set calendar(cal: Calendar) {
		this.cal = cal;
		this.calendarMonths = this.cal.months;

		/* Have the calendar open to the current month and year. */
		this.monthIdx = this.cal.months.findIndex((month) =>
			month.value === this.calendarService.month && month.year === this.calendarService.year);
		this.month = this.cal.months[this.monthIdx];
	}

	@Output() dateSelected = new EventEmitter<CalendarDay>();

	public calendarMonths: CalendarMonth[] = [];
	public month: CalendarMonth;
	public monthIdx: number;

	/* Used to show the short name of the month. */
	public months = shortMonths;

	private cal: Calendar;

	constructor(
		private calendarService: CalendarService
	) { }

	previousMonth(): void {
		/* Check if we are at the first month. */
		if (this.monthIdx >= 0) {
			this.monthIdx--;
			this.month = this.calendarMonths[this.monthIdx];
		}
	}

	nextMonth(): void {
		if (this.monthIdx < this.calendarMonths.length - 1) {
			this.monthIdx++;
			this.month = this.calendarMonths[this.monthIdx];
		}
	}

	selectDate(date: CalendarDay): void {
		this.dateSelected.emit(date);
	}
}
