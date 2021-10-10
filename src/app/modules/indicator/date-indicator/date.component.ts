import { Component, Input } from '@angular/core';
import { DateStatus } from '../../../interfaces/date.interface';

@Component({
	selector: 'app-date-indicator',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.css']
})
export class DateIndicatorComponent {
	@Input() status: DateStatus;
	public dateStatus = DateStatus;
}
