import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Status } from "../../../constants/tasks.constants";

@Component({
	selector: "ml-status-indicator",
	templateUrl: "./status-indicator.component.html",
	styleUrls: ["./status-indicator.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusIndicatorComponent {
	@Input() status: Status;

	public taskStatus = Status;
}
