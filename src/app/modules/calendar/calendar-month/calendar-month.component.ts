import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CalendarService } from '../../../services/calendar.service';
import { CalendarType, Month } from '../../../types/calendar/calendar.types';
import { CalendarDay } from '../../../types/calendar/calendar-response.types';

@Component({
	selector: 'app-calendar-month',
	templateUrl: './calendar-month.component.html',
	styleUrls: ['./calendar-month.component.css']
})
export class CalendarMonthComponent implements OnInit {
	@Input() month: Month;
	@Input() type: CalendarType = CalendarType.Lunar;
	@Input() selectedDate: CalendarDay;

	@Output() dateSelect = new EventEmitter<CalendarDay>();

	public calendarType = CalendarType;

	currentDay: number;
	currentMonth: number;
	currentYear: number;

	constructor(private calendarService: CalendarService) { }

	ngOnInit(): void {
		this.currentYear = this.calendarService.year;
		this.currentMonth = this.calendarService.month;
		this.currentDay = this.calendarService.day;
	}

	isSelectableDate(day: CalendarDay): boolean {
		return day.value > 0;
	}

	selectDate(date: CalendarDay): void {
		this.dateSelect.emit(date);
	}

	onDateKeyPress(event: KeyboardEvent, date: CalendarDay): void {
		if (event.key === "Enter" || event.key === " ") {
			this.selectDate(date);
		}
	}
}
