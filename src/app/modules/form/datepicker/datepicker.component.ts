import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { Calendar, CalendarDay, SelectedDay } from '../../../types/calendar/calendar-response.types';
import { FocusEvent, Key } from '../../../types/focus.types';
import { noCalMessage } from '../../../types/message.types';

import { CalendarService } from '../../../services/calendar.service';
import { ClickService } from '../../../services/click.service';
import { FocusService } from '../../../services/focus.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Input() calendarType: CalendarType = CalendarType.Lunar;
  @Input() disableInput: boolean;
  @Input() disabledDate: string;

  @Output() onDatePicked = new EventEmitter<SelectedDay>();

  @ViewChild('picker', { read: ElementRef, static: false }) picker: ElementRef;

  public showCal = false;
  public isLoading = false;
  public noCalMessage = noCalMessage;

  public cal: Calendar;
  private uuid = UUID.UUID();
  public calendarId = `app-calendar-${this.uuid}`;

  public selectedDate: CalendarDay;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private calendar: CalendarService,
    private clickService: ClickService,
    private focus: FocusService,
  ) { }

  ngOnInit(): void {
    this.setupSubscriptions();
    this.isLoading = true;
    this.calendar.getCalendar(this.calendarType);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupSubscriptions() {
    this.clickService.clicked
      .pipe(takeUntil(this.destroyed$))
      .subscribe(target => {
          this.onDocumentClick(target);
      });

    this.calendar.onCalendarFetched$
      .pipe(
        takeUntil(this.destroyed$)
      ) 
      .subscribe((calendar: Calendar) => {
        this.isLoading = false;
        if (!calendar) {
          return;
        }

        this.cal = calendar;
      });

      this.focus.keyPressed$()
        .pipe(
          filter((event: FocusEvent) => event.elementID === this.calendarId),
          takeUntil(this.destroyed$)
        )
        .subscribe((event: FocusEvent) => {
          switch (event.key) {
            case Key.Escape:
              console.log("Event: ", event, this.showCal);
              if (this.showCal) {
                  this.showHideCal();
              }
              break;
          }
      });
  }

  onDocumentClick(target: any): void {
    if (!this.picker.nativeElement.contains(target)) {
      if (this.showCal) {
        this.showHideCal();
      }
    }
  }

  onKeydownEvent(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      this.showHideCal();
    }
  }

  showHideCal(): void {
    this.showCal = !this.showCal;
  }

  selectDate(date: SelectedDay): void {
    this.selectedDate = date;
    this.showHideCal();
    this.onDatePicked.emit(date);
  }
}
