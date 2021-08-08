import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementModule } from '../../element/element.module';
import { IndicatorModule } from '../../indicator/indicator.module';

import { BirthdaysComponent } from './birthdays.component';
import { BirthdayTasksRoutingModule } from './birthdays-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    BirthdaysComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ElementModule,
    BirthdayTasksRoutingModule,
    IndicatorModule,
  ],
  exports: [
    BirthdaysComponent,
  ]
})
export class BirthdaysTaskModule { }