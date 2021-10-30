import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';

import { Event } from '../../../../constants/events.contants';
import { NO_ITEMS_CONFIG } from '../../../../interfaces/no-items.interface';
import { AddMeeting } from '../../../../interfaces/service/service-objects.interface';

@Component({
  selector: 'task-meetings-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	@Input() list: AddMeeting[] = [];
	@Output() deletedBirthday = new EventEmitter();

	noItemsConfig = NO_ITEMS_CONFIG[Event.Meeting];

	constructor() { }

	ngOnInit(): void {
	}
}
