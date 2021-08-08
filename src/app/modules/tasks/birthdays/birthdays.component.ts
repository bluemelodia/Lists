import { 
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, take, takeUntil } from 'rxjs/operators';

import { BirthdayService } from '../../../services/birthday.service';
import { DialogService } from '../../../services/dialog.service';
import { AddBirthday } from '../../../types/birthday/birthday.types';
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

  private ngUnsubscribe$ = new Subject<void>();

  @HostBinding('class.hide-scrollbar') public css = true; 

  constructor(
    private birthdayService: BirthdayService,
    private dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.getBirthdays();
  }

  public getBirthdays(): void {
    this.birthdayService.getBirthdays()
      .pipe(
        catchError((err) => {
            this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
            return of(null);
        }),
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
