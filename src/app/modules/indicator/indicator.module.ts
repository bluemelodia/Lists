import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateIndicatorComponent } from "./date-indicator/date.component";
import { MeetingIndicatorComponent } from './meeting-indicator/meeting.component';
import { RecurrenceIndicatorComponent } from "./recurrence-indicator/recurrence.component";

@NgModule({
	declarations: [
		DateIndicatorComponent,
		MeetingIndicatorComponent,
		RecurrenceIndicatorComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DateIndicatorComponent,
		MeetingIndicatorComponent,
		RecurrenceIndicatorComponent,
	],
})
export class IndicatorModule { }
