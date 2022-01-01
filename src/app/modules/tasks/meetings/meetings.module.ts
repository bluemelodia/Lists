import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementModule } from '../../element/element.module';
import { ListComponent } from './list/list.component';
import { MeetingsComponent } from './meetings.component';
import { MeetingTasksRoutingModule } from './meetings-routing.module';

import { DirectiveModule } from '../../../directives/directives.module';
import { IconsModule } from '../../icons/icons.module';
import { IndicatorModule } from '../../indicator/indicator.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
	declarations: [
		ListComponent,
		MeetingsComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		IconsModule,
		IndicatorModule,
		MeetingTasksRoutingModule,
		PipesModule,
	],
	exports: [
		MeetingsComponent,
	]
})
export class MeetingsTaskModule { }
