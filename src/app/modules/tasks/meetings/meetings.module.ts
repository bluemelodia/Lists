import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementModule } from '../../element/element.module';
import { ListComponent } from './list/list.component';
import { MeetingsComponent } from './meetings.component';
import { MeetingTasksRoutingModule } from './meetings-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
	declarations: [
		ListComponent,
		MeetingsComponent,
	],
	imports: [
		CommonModule,
		ElementModule,
		MeetingTasksRoutingModule,
		PipesModule,
	],
	exports: [
		MeetingsComponent,
	]
})
export class MeetingsTaskModule { }
