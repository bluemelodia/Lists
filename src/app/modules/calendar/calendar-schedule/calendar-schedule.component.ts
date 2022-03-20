import { Component, Input } from "@angular/core";
import { CalendarSchedule } from "../../../interfaces/calendar/calendar-response.interface";

@Component({
	selector: "ml-calendar-schedule",
	templateUrl: "./calendar-schedule.component.html",
	styleUrls: ["./calendar-schedule.component.css"]
})
export class CalendarScheduleComponent {
	@Input() schedule: CalendarSchedule;
}