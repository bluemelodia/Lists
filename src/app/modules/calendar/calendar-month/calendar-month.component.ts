import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Topic } from "../../../constants/topics.constants";
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
	@Input() topic: Topic;

	@Output() dateSelect = new EventEmitter<CalendarDay>();

	public calendarType = CalendarType;

	isSelectableDate(day: CalendarDay): boolean {
		return day.value > 0;
	}

	isSelectedDate(day: CalendarDay): boolean {
		switch(this.type) {
			case CalendarType.Solar:
				if (this.topic === Topic.Birthdays) {
					return this.selectedDate
						&& day.month === this.selectedDate.month 
						&& day.value === this.selectedDate.value;
				} else {
					return this.selectedDate
						&& day.month === this.selectedDate.month 
						&& day.value === this.selectedDate.value
						&& day.year === this.selectedDate.year;
				}

			case CalendarType.Lunar:
				return this.selectedDate
					&& day.cmonth === this.selectedDate.cmonth
					&& day.cdate === this.selectedDate.cdate;
		}
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
