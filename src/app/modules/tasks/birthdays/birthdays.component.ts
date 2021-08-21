import { 
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, map, take, takeUntil } from 'rxjs/operators';

import { BirthdayService } from '../../../services/birthday.service';
import { CalendarService } from '../../../services/calendar.service';
import { DialogService } from '../../../services/dialog.service';
import { AddBirthday } from '../../../types/birthday/birthday.types';
import { CalendarType } from '../../../types/calendar/calendar.types';
import { Calendar } from '../../../types/calendar/calendar-response.types';
import { Dialog } from '../../../types/dialog/dialog.types';
import { ResponseStatus } from '../../../types/response.types';

@Component({
  selector: 'task-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdaysComponent implements OnInit, OnDestroy {
  private birthdays$ = new Subject<AddBirthday[]>();
  public birthdayList$ = this.birthdays$.asObservable();
  public isLoading = false;

  private calendar: Calendar;

  private ngUnsubscribe$ = new Subject<void>();

  @HostBinding('class.hide-scrollbar') public css = true; 

  constructor(
    private birthdayService: BirthdayService,
    private calendarService: CalendarService,
    private dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    console.info("🍰 ✅ BirthdaysComponent init");
    this.fetchCalendar();
    this.getBirthdays();
  }

  /**
  * Pre-fetch the calendar.
  */
  private fetchCalendar() {
    this.isLoading = true;
    this.calendarService.getCalendar(CalendarType.Lunar);
    this.calendarService.onCalendarFetched$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((calendar: Calendar) => {
        if (!calendar) {
          return;
        }
  
        this.calendar = calendar;
        this.patchBirthdays();
      });
  }

  /**
	* Check the user's birthday list, silently adding lunar birthdays
	* for the next year if not already present. When we get the user's
	* list of birthdays, we will group the lunar birthdays together.
  *
  * We do this on the client side so that active users will have an
  * up-to-date birthdays list.
	*/
  private patchBirthdays() {
    this.isLoading = true;
    this.birthdayService.getBirthdays('guest')
      .pipe(
        map((birthdays: AddBirthday[]) => birthdays.filter((birthday) => birthday.lunar)),
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((birthdays: AddBirthday[]) => {
        console.info("🍰 ✅ BirthdaysComponent, BirthdayService returned birthdays: ", birthdays);
        this.birthdayService.updateBirthdays(this.calendar, birthdays);
      });
  }

  public getBirthdays(): void {
    this.isLoading = true;
    this.birthdayService.getBirthdays()
      .pipe(
        catchError((err) => {
            this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
            return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        take(1),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((birthdays: AddBirthday[]) => {
        console.info("🍰 ✅ BirthdaysComponent, received birthdays: ", birthdays);
        this.birthdays$.next(birthdays);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
