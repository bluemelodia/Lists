import { Component, HostBinding, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { BirthdayService } from './services/birthday.service';
import { CalendarService } from './services/calendar.service';
import { NavService } from './services/nav.service';
import { AddBirthday } from './types/birthday/birthday.types';
import { Calendar } from './types/calendar/calendar-response.types';
import { CalendarType } from './types/calendar/calendar.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private birthdayService: BirthdayService,
    private calendarService: CalendarService,
    private nav: NavService
  ) {}

  @HostBinding('class') containerClasses = 'flex-centered__column full-viewport';

  title = 'lists';
  calendar: Calendar;

  ngOnInit() {
    this.startup();
  }

  closeMenu() {
    this.nav.closeNavMenu();
  }

  private startup() {
    this.fetchCalendar();
  }

  /**
   * Pre-fetch the calendar.
   */
  private fetchCalendar() {
    this.calendarService.getCalendar(CalendarType.Lunar);
		this.calendarService.onCalendarFetched$
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
  patchBirthdays() {
    this.birthdayService.getBirthdays('guest')
      .pipe(
        map((birthdays: AddBirthday[]) => birthdays.filter((birthday) => birthday.lunar)),
        take(1)
      )
      .subscribe((birthdays: AddBirthday[]) => {
        console.info("🍰 ✅ @App startup, BirthdayService returned birthdays: ", birthdays);
        this.birthdayService.updateBirthdays(this.calendar, birthdays);
      });
  }
}
