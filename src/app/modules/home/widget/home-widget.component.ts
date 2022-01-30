import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { AddMeeting } from "../../../interfaces/service/service-objects.interface";
import { RecipientList } from "../../../interfaces/event/recipient.interface";
import { Task } from "../../../interfaces/event/task.interface";

@Component({
	selector: "app-home-widget",
	templateUrl: "./home-widget.component.html",
	styleUrls: ["./home-widget.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWidgetComponent {
	@Input() list: RecipientList | AddMeeting[] | Task[];
}