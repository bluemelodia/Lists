import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsComponent } from './gifts.component';
import { GiftTasksRoutingModule } from './gift-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    GiftsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
	GiftTasksRoutingModule,
  ]
})
export class GiftsTaskModule { }
