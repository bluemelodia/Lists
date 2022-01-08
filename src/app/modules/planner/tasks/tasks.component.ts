import { Component, OnInit } from "@angular/core";

import { HeaderLevel } from "../../../interfaces/header.interface";

@Component({
	selector: 'planner-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	public headerLevel = HeaderLevel;

	ngOnInit(): void {
		this.getTasks();
	}

	public getTasks(): void {
		
	}
}