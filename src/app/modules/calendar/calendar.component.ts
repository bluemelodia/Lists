import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar, CalendarMonth, SelectedDay } from '../../types/calendar/calendar-response.types';
import { CalendarType, shortMonths } from '../../types/calendar/calendar.types';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
	@Input() type: CalendarType;
	@Input() set selectedDay(selected: SelectedDay) {
		/* If user selected a date, open the calendar to the selected month. */
		if (selected) {
			this.monthIdx = this.cal.months.findIndex((month) =>
				month.value === selected.month && month.year === selected.year);
			this.month = this.cal.months[this.monthIdx];
			this.selectedDate = selected;
		}
	}
	public selectedDate: SelectedDay;

	@Input() set calendar(cal: Calendar) {
		this.cal = cal;
		this.calendarMonths = this.cal.months;

		/* Have the calendar open to the current month and year. */
		this.month = this.cal.months[0];
		this.monthIdx = 0;
	}

	@Output() onDateSelected = new EventEmitter<SelectedDay>();

	private cal: Calendar;
	calendarMonths: CalendarMonth[] = [];

	/* Used to show the short name of the month. */
	months = shortMonths;

	month: CalendarMonth;
	currentMonth: number;
	currentYear: number;
	monthIdx: number;

	constructor() { }

	ngOnInit(): void {}

	previousMonth(): void {
			/* Check if we are at the first month. */
			if (this.monthIdx >= 0) {
				this.monthIdx--;
				this.month = this.calendarMonths[this.monthIdx];
			}
	}

	nextMonth(): void {
		if (this.monthIdx < this.calendarMonths.length-1) {
			this.monthIdx++;
			this.month = this.calendarMonths[this.monthIdx];
		}
	}

	selectDate(date: SelectedDay) {
		console.log("Selected Date: ", date);
		this.onDateSelected.emit(date);
	}
}
