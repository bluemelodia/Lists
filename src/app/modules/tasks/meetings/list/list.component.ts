import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';

import { AddMeeting } from '../../../../interfaces/service/service-objects.interface';

@Component({
  selector: 'task-meetings-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	@Input() list: AddMeeting[] = [];
	@Output() deletedBirthday = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}
}
