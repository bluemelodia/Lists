import { 
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BirthdayService } from '../../../services/birthday.service';
import { AddBirthday } from '../../../types/birthday/birthday.types';

@Component({
  selector: 'task-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdaysComponent implements OnInit, OnDestroy {
  private birthdays$ = new Subject<AddBirthday[]>();
  public birthdayList$ = this.birthdays$.asObservable();

  private ngUnsubscribe$ = new Subject<void>();

  @HostBinding('class.hide-scrollbar') public css = true; 

  constructor(
    private birthdayService: BirthdayService,
  ) { }

  public ngOnInit(): void {
    this.getBirthdays();
  }

  public getBirthdays(): void {
    this.birthdayService.getBirthdays()
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((birthdays: AddBirthday[]) => {
        console.log("Received birthdays: ", birthdays);
        this.birthdays$.next(birthdays);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
