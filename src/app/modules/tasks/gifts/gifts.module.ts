import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsComponent } from './gifts.component';
import { GiftTasksRoutingModule } from './gift-routing.module';
import { ListComponent } from './list/list.component';

import { ElementModule } from '../../element/element.module';
import { IconsModule } from '../../icons/icons.module';

@NgModule({
  declarations: [
    GiftsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
	ElementModule,
	IconsModule,
	GiftTasksRoutingModule,
  ]
})
export class GiftsTaskModule { }
