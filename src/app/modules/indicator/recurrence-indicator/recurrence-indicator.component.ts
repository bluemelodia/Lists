import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Recurrence, RecurrenceMap } from "../../../constants/tasks.constants";

@Component({
	selector: "ml-recurrence-indicator",
	templateUrl: "./recurrence-indicator.component.html",
	styleUrls: ["./recurrence-indicator.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurrenceIndicatorComponent {
	@Input() set recurrences(recurrences: RecurrenceMap) {
		Object.keys(recurrences).forEach((recurrence: Recurrence) => {
			if (recurrences[recurrence]) {
				this.recurrenceList.push(recurrence);
			}
		});
	}
	public recurrenceList: Recurrence[] = [];

	public recurrenceStatus = Recurrence;
}
