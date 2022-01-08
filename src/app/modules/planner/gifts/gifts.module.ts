import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsComponent } from './gifts.component';
import { GiftTasksRoutingModule } from './gift-routing.module';
import { ListComponent } from './list/list.component';

import { DirectiveModule } from '../../../directives/directives.module';
import { ElementModule } from '../../element/element.module';
import { FormElementModule } from '../../form/form.module';
import { IconsModule } from '../../icons/icons.module';

@NgModule({
	declarations: [
		GiftsComponent,
		ListComponent
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormElementModule,
		IconsModule,
		GiftTasksRoutingModule,
	]
})
export class GiftModule { }
