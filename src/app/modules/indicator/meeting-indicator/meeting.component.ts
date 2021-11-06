import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-indicator',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingIndicatorComponent implements OnInit {
	@Input() isVirtual: boolean;

	constructor() { }

	ngOnInit(): void {
	}
}
