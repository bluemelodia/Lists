import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateIndicatorComponent } from './date-indicator/date.component';

@NgModule({
	declarations: [
		DateIndicatorComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DateIndicatorComponent,
	],
})
export class IndicatorModule { }
