import { Component, Input, OnInit } from '@angular/core';
import { Recurrence } from '../../../interfaces/event.interface';

@Component({
  selector: 'app-meeting-indicator',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingIndicatorComponent implements OnInit {
	@Input() isVirtual: boolean;
	@Input() recurrence: Recurrence;

	public recurrenceStatus = Recurrence;

	constructor() { }

	ngOnInit(): void {
	}
}
