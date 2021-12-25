import { Component, EventEmitter, Input, Output } from "@angular/core";

import { CalendarType, Month } from "../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../interfaces/calendar/calendar-response.interface";

@Component({
	selector: "app-calendar-month",
	templateUrl: "./calendar-month.component.html",
	styleUrls: ["./calendar-month.component.css"]
})
export class CalendarMonthComponent {
	@Input() month: Month;
	@Input() type: CalendarType = CalendarType.Lunar;
	@Input() selectedDate: CalendarDay;

	@Output() dateSelect = new EventEmitter<CalendarDay>();

	public calendarType = CalendarType;

	isSelectableDate(day: CalendarDay): boolean {
		return day.value > 0;
	}

	isSelectedDate(day: CalendarDay): boolean {
		return this.selectedDate
			&& day.year === this.selectedDate.year 
            && day.month === this.selectedDate.month 
            && day.value === this.selectedDate.value;
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
