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
	@Input() set type(listType: ListType) {
		this.displayList = listType;

		switch(listType) {
			case ListType.SolarBirthdays:
				this.title = 'Upcoming Solar Birthdays';
				this.ariaLabel = 'Navigate to Birthdays';
				break;
			case ListType.LunarBirthdays:
				this.title = 'Upcoming Lunar Birthdays';
				this.ariaLabel = 'Navigate to Birthdays';
				break;
			case ListType.Tasks:
				this.title = 'Upcoming Tasks';
				this.ariaLabel = 'Navigate to Tasks';
				break;
			case ListType.Gifts:
				this.title = 'Upcoming Gifts';
				this.ariaLabel = 'Navigate to Gifts';
				break;
		}
	}
	public displayList: ListType;

	public currentYear: number;
	public headerLevel = HeaderLevel;
	public icon = Icon;
	public listType = ListType;

	public title = '';
	public ariaLabel = '';

	constructor(
		private calendarService: CalendarService,
	) {
		this.currentYear = this.calendarService.year;
	}

	public navigateToPage(listType: ListType): void {
		
	}
}