import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdayComponent} from './birthday/birthday.component';

@NgModule({
  declarations: [
    BirthdayComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BirthdayComponent,
  ]
})
export class WidgetModule { }
