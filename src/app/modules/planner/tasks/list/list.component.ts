import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

import { Event } from "../../../../constants/events.contants";
import { Icon } from "../../../../constants/icons.constants";

import { Task } from "../../../../interfaces/event/task.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { NO_ITEMS_CONFIG } from "../../../../interfaces/no-items.interface";

@Component({
	selector: 'planner-tasks-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: Task[] = [];

	@Output() deletedTask = new EventEmitter();

	public headerLevel = HeaderLevel;
	public icon = Icon;
	public noItemsConfig = NO_ITEMS_CONFIG[Event.Task];

	private ngUnsubscribe$ = new Subject<void>();

}