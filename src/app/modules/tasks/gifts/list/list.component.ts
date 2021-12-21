import { 
	Component, 
	EventEmitter, 
	HostBinding, 
	Input, 
	OnInit, 
	Output,
} from '@angular/core';
import { GiftDetails } from '../../../../interfaces/event/gift.interface';

@Component({
  selector: 'task-gifts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	@HostBinding("class") public get hostClasses(): string {
		let hostStyles = [];
		return hostStyles.join(" ");
	}

	@Input() list: GiftDetails[];
	@Input() header: string;
	@Output() deletedGift = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}
}
