import { NgModule } from "@angular/core";
import { MeetingFormatterPipe } from "./meeting-formatter.pipe";
import { PickerDateFormatterPipe } from "./picker-date-formatter.pipe";
import { TaskFormatterPipe } from "./task-formatter.pipe";

@NgModule({
	declarations: [
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
		TaskFormatterPipe,
	],
	exports: [
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
		TaskFormatterPipe,
	]
})
export class PipesModule { }
