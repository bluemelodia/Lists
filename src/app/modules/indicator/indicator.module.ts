import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateIndicatorComponent } from "./date-indicator/date.component";
import { MeetingIndicatorComponent } from './meeting-indicator/meeting.component';

@NgModule({
	declarations: [
		DateIndicatorComponent,
  		MeetingIndicatorComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DateIndicatorComponent,
		MeetingIndicatorComponent,
	],
})
export class IndicatorModule { }
