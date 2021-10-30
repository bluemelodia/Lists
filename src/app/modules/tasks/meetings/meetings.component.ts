import { Component, OnInit } from '@angular/core';

import { HeaderLevel } from '../../../interfaces/header.interface';

@Component({
	selector: 'task-meetings',
	templateUrl: './meetings.component.html',
	styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
	headerLevel = HeaderLevel;
	header = 'Upcoming Meetings';


	constructor() { }

	ngOnInit(): void {
	}
}
