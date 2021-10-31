import { NgModule } from "@angular/core";
import { MeetingFormatterPipe } from "./meeting-formatter.pipe";
import { PickerDateFormatterPipe } from "./picker-date-formatter.pipe";

@NgModule({
	declarations: [
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
	],
	exports: [
		MeetingFormatterPipe,
		PickerDateFormatterPipe,
	]
})
export class PipesModule { }
