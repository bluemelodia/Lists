import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

import { Topic } from "../../../constants/topics.constants";
import { CalendarType, Month } from "../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../interfaces/calendar/calendar-response.interface";

@Component({
	selector: "ml-calendar-month",
	templateUrl: "./calendar-month.component.html",
	styleUrls: ["./calendar-month.component.css"]
})
export class CalendarMonthComponent {
	@HostBinding("class.fullscreen") public fullScreen = false;

	@Input() month: Month;
	@Input() set type(type: CalendarType) {
		this.fullScreen = type === CalendarType.Schedule;
		this.calType = type;
	}
	public calType = CalendarType.Lunar;
	public calendarType = CalendarType;

	@Input() selectedDate: CalendarDay;
	@Input() topic: Topic;

	@Output() dateSelect = new EventEmitter<CalendarDay>();

	isSelectableDate(day: CalendarDay): boolean {
		return day.value > 0;
	}

	isSelectedDate(day: CalendarDay): boolean {
		switch (this.calType) {
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
