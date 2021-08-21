import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';

import { PickerDateFormatterPipe } from '../../../pipes/picker-date-formatter.pipe';

import { CalendarService } from '../../../services/calendar.service';
import { ClickService } from '../../../services/click.service';
import { FocusService } from '../../../services/focus.service';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { Calendar, CalendarDay } from '../../../types/calendar/calendar-response.types';
import { FocusEvent, Key } from '../../../types/focus.types';
import { noCalMessage } from '../../../types/message.types';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Input() calendarType: CalendarType = CalendarType.Lunar;
  @Input() form: FormGroup;
  @Input() submitted: boolean = false;

  @ViewChild('picker', { read: ElementRef, static: false }) picker: ElementRef;

  public showCal = false;
  public isLoading = false;
  public noCalMessage = noCalMessage;

  public cal: Calendar;
  private uuid = UUID.UUID();
  public calendarId = `app-calendar-${this.uuid}`;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private readonly calendar: CalendarService,
    private readonly clickService: ClickService,
    private readonly dateFormatterPipe: PickerDateFormatterPipe,
    private readonly focus: FocusService,
  ) { }

  public ngOnInit(): void {
    this.setupSubscriptions();
    this.isLoading = true;
    this.calendar.getCalendar(this.calendarType);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private setupSubscriptions() {
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

  private onDocumentClick(target: any): void {
    if (!this.picker.nativeElement.contains(target)) {
      if (this.showCal) {
        this.showHideCal();
      }
    }
  }

  public onKeydownEvent(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      this.showHideCal();
    }
  }

  public showHideCal(): void {
    this.showCal = !this.showCal;
  }

  public selectDate(date: CalendarDay): void {
    this.form.patchValue({
      birthday: date
    });
    this.showHideCal();
  }
}
