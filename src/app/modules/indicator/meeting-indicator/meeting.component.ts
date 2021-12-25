import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meeting-indicator',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingIndicatorComponent {
	@Input() isVirtual: boolean;
}
