import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementModule } from '../../element/element.module';
import { ListComponent } from './list/list.component';
import { MeetingsComponent } from './meetings.component';
import { MeetingTasksRoutingModule } from './meetings-routing.module';

@NgModule({
  declarations: [
	ListComponent,
	MeetingsComponent,
  ],
  imports: [
    CommonModule,
	ElementModule,
	MeetingTasksRoutingModule,
  ],
  exports: [
	MeetingsComponent,
  ]
})
export class MeetingsTaskModule { }
