import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdaysComponent } from './birthdays.component';
import { BirthdayTasksRoutingModule } from './birthdays-routing.module';

@NgModule({
  declarations: [
    BirthdaysComponent,
  ],
  imports: [
    CommonModule,
    BirthdayTasksRoutingModule,
  ],
  exports: [
    BirthdaysComponent,
  ]
})
export class BirthdaysTaskModule { }