import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarType, Month } from '../../../types/calendar/calendar.types';
import { CalendarMonth, CalendarDay, SelectedDay } from '../../../types/calendar/calendar-response.types';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css']
})
export class CalendarMonthComponent {
    @Input() month: Month;
    @Input() type: CalendarType;
    @Input() selectedDate: SelectedDay;

    @Output() onDateSelect = new EventEmitter<CalendarDay>();

    public calendarType = CalendarType;

    currentDay: number;
    currentMonth: number;
    currentYear: number;

    ngOnInit(): void {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth()+1;
      this.currentDay = date.getDate();
    }

    isSelectableDate(month: CalendarMonth, day: CalendarDay): boolean {
      if (day.value < 0) return false;

      const beforeToday = month.year === this.currentYear && month.value === this.currentMonth && day.value < this.currentDay;
      return !beforeToday;
    }

    selectDate(date: SelectedDay, month: number, year: number): void {
      const selectedDate = date;
      selectedDate.month = month;
      selectedDate.year = year;
      console.log("Selected: ", selectedDate);
      this.onDateSelect.emit(selectedDate);
    }

    onDateKeyPress(event: KeyboardEvent, date: SelectedDay, month: number, year: number): void {
      if (event.key === "Enter" || event.key === " ") {
        this.selectDate(date, month, year);
      }
    }
}
