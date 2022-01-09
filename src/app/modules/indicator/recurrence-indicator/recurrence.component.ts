import { Component, Input } from "@angular/core";

import { Recurrence, RecurrenceMap } from "../../../constants/tasks.constants";

@Component({
	selector: "app-recurrence-indicator",
	templateUrl: "./recurrence.component.html",
	styleUrls: ["./recurrence.component.css"]
})
export class RecurrenceIndicatorComponent {
	@Input() set recurrences(recurrences : RecurrenceMap) {
		Object.keys(recurrences).forEach((recurrence: Recurrence) => {
			if (recurrences[recurrence]) {
				this.recurrenceList.push(recurrence);
			}
		});
	}
	public recurrenceList: Recurrence[] = [];

	public recurrenceStatus = Recurrence;
}
