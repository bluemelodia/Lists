import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Icon } from "../../../constants/icons.constants";
import { ListType } from "../../../constants/list.constants";

import { AddMeeting } from "../../../interfaces/service/service-objects.interface";
import { RecipientList } from "../../../interfaces/event/recipient.interface";
import { Task } from "../../../interfaces/event/task.interface";
import { HeaderLevel } from "../../../interfaces/header.interface";

import { CalendarService } from "../../../services/calendar.service";

@Component({
	selector: "app-home-widget",
	templateUrl: "./home-widget.component.html",
	styleUrls: ["./home-widget.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWidgetComponent {
	@Input() list: RecipientList | AddMeeting[] | Task[];
	@Input() type: ListType; 

	constructor(
		private calendarService: CalendarService,
	) {
		this.currentYear = this.calendarService.year;
	}

	public currentYear: number;
	public headerLevel = HeaderLevel;
	public icon = Icon;
	public listType = ListType;
}