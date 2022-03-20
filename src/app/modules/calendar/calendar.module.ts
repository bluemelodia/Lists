import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CalendarComponent } from "./calendar.component";
import { CalendarMonthComponent } from "./calendar-month/calendar-month.component";
import { CalendarScheduleComponent } from "./calendar-schedule/calendar-schedule.component";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
	declarations: [
		CalendarComponent,
		CalendarMonthComponent,
		CalendarScheduleComponent,
	],
	imports: [
		CommonModule,
		PipesModule,
	],
	exports: [
		CalendarComponent
	]
})
export class CalendarModule { }