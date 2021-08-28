import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from '../calendar/calendar.module';
import { DirectiveModule } from '../../directives/directives.module';
import { ElementModule } from '../element/element.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PickerDateFormatterPipe } from '../../pipes/picker-date-formatter.pipe';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';

@NgModule({
	declarations: [
		CheckboxComponent,
		DatepickerComponent,
		RadioComponent,
		SelectComponent
	],
	imports: [
		CalendarModule,
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormsModule,
		PipesModule,
		ReactiveFormsModule,
	],
	exports: [
		CheckboxComponent,
		DatepickerComponent,
		RadioComponent,
		SelectComponent
	],
	providers: [
		PickerDateFormatterPipe,
	]
})
export class FormElementModule { }
