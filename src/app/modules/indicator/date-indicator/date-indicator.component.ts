import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { DateStatus } from "../../../interfaces/date.interface";

@Component({
	selector: "ml-date-indicator",
	templateUrl: "./date-indicator.component.html",
	styleUrls: ["./date-indicator.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateIndicatorComponent {
	@Input() status: DateStatus;

	public dateStatus = DateStatus;
}
