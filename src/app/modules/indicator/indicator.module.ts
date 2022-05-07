import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateIndicatorComponent } from "./date-indicator/date-indicator.component";
import { MeetingIndicatorComponent } from './meeting-indicator/meeting-indicator.component';
import { RecurrenceIndicatorComponent } from "./recurrence-indicator/recurrence-indicator.component";
import { StatusIndicatorComponent } from "./status-indicator/status-indicator.component";

@NgModule({
	declarations: [
		DateIndicatorComponent,
		MeetingIndicatorComponent,
		RecurrenceIndicatorComponent,
		StatusIndicatorComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DateIndicatorComponent,
		MeetingIndicatorComponent,
		RecurrenceIndicatorComponent,
		StatusIndicatorComponent,
	],
})
export class IndicatorModule { }
