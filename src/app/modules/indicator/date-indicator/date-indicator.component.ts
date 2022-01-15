import { Component, Input } from "@angular/core";

import { DateStatus } from "../../../interfaces/date.interface";

@Component({
	selector: "app-date-indicator",
	templateUrl: "./date-indicator.component.html",
	styleUrls: ["./date-indicator.component.css"]
})
export class DateIndicatorComponent {
	@Input() status: DateStatus;

	public dateStatus = DateStatus;
}
