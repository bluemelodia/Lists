import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Icon } from "../../../constants/icons.constants";
import { ListType } from "../../../constants/list.constants";
import { Topic } from "../../../constants/topics.constants";

import { AddMeeting, AddRecipient } from "../../../interfaces/service/service-objects.interface";
import { Task } from "../../../interfaces/event/task.interface";
import { HeaderLevel } from "../../../interfaces/header.interface";

import { CalendarService } from "../../../services/calendar.service";
import { NavService } from "../../../services/nav.service";

@Component({
	selector: "app-home-widget",
	templateUrl: "./home-widget.component.html",
	styleUrls: ["./home-widget.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWidgetComponent {

	@Input() list: AddRecipient[] | AddMeeting[] | Task[];
	@Input() set type(listType: ListType) {
		this.displayList = listType;
		this.configureWidget(listType);
	}
	public displayList: ListType;

	public currentYear: number;
	public headerLevel = HeaderLevel;
	public icon = Icon;
	public listType = ListType;

	public title = '';
	public ariaLabel = '';
	public noResultsMsg = '';

	constructor(
		private calendarService: CalendarService,
		private navService: NavService,
	) {
		this.currentYear = this.calendarService.year;
	}

	public navigateToPage(listType: ListType): void {
		switch (listType) {
			case ListType.SolarBirthdays:
			case ListType.LunarBirthdays:
				this.navService.navigateToTopic(Topic.Birthdays);
				break;
			case ListType.Tasks:
				this.navService.navigateToTopic(Topic.Tasks);
				break;
			case ListType.Meetings:
				this.navService.navigateToTopic(Topic.Meetings);
				break;
		}
	}

	private configureWidget(listType: ListType): void {
		switch (listType) {
			case ListType.SolarBirthdays:
				this.title = 'Upcoming Solar Birthdays';
				this.ariaLabel = 'Navigate to Birthdays';
				this.noResultsMsg = 'No upcoming solar birthdays.';
				break;
			case ListType.LunarBirthdays:
				this.title = 'Upcoming Lunar Birthdays';
				this.ariaLabel = 'Navigate to Birthdays';
				this.noResultsMsg = 'No upcoming lunar birthdays.';
				break;
			case ListType.Tasks:
				this.title = 'Upcoming Tasks';
				this.ariaLabel = 'Navigate to Tasks';
				this.noResultsMsg = 'No upcoming tasks.';
				break;
			case ListType.Meetings:
				this.title = 'Upcoming Meetings';
				this.ariaLabel = 'Navigate to Meetings';
				this.noResultsMsg = 'No upcoming meetings.';
				break;
		}
	}
}