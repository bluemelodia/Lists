import { 
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/types/response.types';

import { BirthdayService } from '../../../../services/birthday.service';
import { AddBirthday } from '../../../../types/birthday/birthday.types';
import { HeaderLevel } from '../../../../types/header.types';

@Component({
  selector: 'task-birthdays-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() list: AddBirthday[];
  @Output() onDeleteBirthday = new EventEmitter();

  headerLevel = HeaderLevel;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {
  }

  deleteBirthday(uuid: string) {
    this.birthdayService.deleteBirthday(uuid)
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((response: ResponseStatus) => {
        if (response === ResponseStatus.SUCCESS) {
          this.onDeleteBirthday.emit(null);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
