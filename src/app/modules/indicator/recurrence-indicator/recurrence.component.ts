import { Component, Input } from "@angular/core";

import { Recurrence } from "../../../constants/tasks.constants";

@Component({
	selector: "app-recurrence-indicator",
	templateUrl: "./recurrence.component.html",
	styleUrls: ["./recurrence.component.css"]
})
export class RecurrenceIndicatorComponent {
	@Input() recurrences: Recurrence[];

	public recurrenceStatus = Recurrence;
}
