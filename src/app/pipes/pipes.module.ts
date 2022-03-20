import { NgModule } from "@angular/core";
import { MeetingCalendarPipe } from "./meeting-calendar.pipe";
import { MeetingFormatterPipe } from "./meeting-formatter.pipe";
import { PickerDateFormatterPipe } from "./picker-date-formatter.pipe";
import { TaskCalendarPipe } from "./task-calendar.pipe";
import { TaskFormatterPipe } from "./task-formatter.pipe";

@NgModule({
	declarations: [
		MeetingCalendarPipe,
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
		TaskCalendarPipe,
		TaskFormatterPipe,
	],
	exports: [
		MeetingCalendarPipe,
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
		TaskCalendarPipe,
		TaskFormatterPipe,
	]
})
export class PipesModule { }
