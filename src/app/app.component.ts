import { Component, HostBinding, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { BirthdayService } from './services/birthday.service';
import { NavService } from './services/nav.service';
import { AddBirthday } from './types/birthday/birthday.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private birthdayService: BirthdayService,
    private nav: NavService
  ) {}

  @HostBinding('class') containerClasses = 'flex-centered__column full-viewport';

  title = 'lists';

  ngOnInit() {
    this.startup();
  }

  closeMenu() {
    this.nav.closeNavMenu();
  }

  private startup() {
    this.patchBirthdays();
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
    this.birthdayService.getBirthdays()
      .pipe(
        take(1)
      )
      .subscribe((birthdays: AddBirthday[]) => {
        console.log("App startup Received birthdays: ", birthdays);
      });
  }
}
