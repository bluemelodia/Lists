import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'ml-meeting-indicator',
	templateUrl: './meeting-indicator.component.html',
	styleUrls: ['./meeting-indicator.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingIndicatorComponent {
	@Input() isVirtual: boolean;
}
