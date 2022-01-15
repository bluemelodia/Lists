import { 
	Component,
	ElementRef,
	EventEmitter,
	Output,
} from '@angular/core';

import { SelectComponent } from '../select.component';

import { Status } from '../../../../constants/tasks.constants';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-status-filter',
	templateUrl: './status-filter.component.html',
	styleUrls: [
		"../select.component.css",
		'status-filter.component.css'
	]
})
export class SelectFilterComponent extends SelectComponent {
	@Output() onStatusSelect = new EventEmitter<Status>();
	@Output() onFilterReset = new EventEmitter<void>();

	public selected: Status;
	public status = Status;
	public statusKeys = Object.keys(this.status);

	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}


	public clearFilter(): void {
		this.onFilterReset.emit();
	}

	public selectOption(status: Status): void {
		this.showOptionList = false;
		this.selected = status;
		this.onStatusSelect.emit(status);
	}
}
