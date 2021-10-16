import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CalendarComponent } from "./calendar.component";
import { CalendarMonthComponent } from "./calendar-month/calendar-month.component";

@NgModule({
	declarations: [
		CalendarComponent,
		CalendarMonthComponent,
	],
	imports: [
		CommonModule
	],
	exports: [
		CalendarComponent
	]
})
export class CalendarModule { }