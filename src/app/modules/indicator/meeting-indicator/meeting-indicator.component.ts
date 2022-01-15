import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-meeting-indicator',
	templateUrl: './meeting-indicator.component.html',
	styleUrls: ['./meeting-indicator.component.css']
})
export class MeetingIndicatorComponent {
	@Input() isVirtual: boolean;
}
