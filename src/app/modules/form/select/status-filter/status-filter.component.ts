import {
	Component,
	ElementRef,
	EventEmitter,
	Output,
} from '@angular/core';

import { SelectComponent } from '../select.component';

import { Icon } from '../../../../constants/icons.constants';
import { Status } from '../../../../constants/tasks.constants';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'ml-status-filter',
	templateUrl: './status-filter.component.html',
	styleUrls: [
		"../select.component.css",
		'status-filter.component.css'
	]
})
export class SelectFilterComponent extends SelectComponent {
	@Output() statusSelect = new EventEmitter<Status>();
	@Output() filterReset = new EventEmitter<void>();

	public icon = Icon;
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
		this.selected = null;
		this.filterReset.emit();
	}

	public selectOption(status: Status): void {
		this.showOptionList = false;
		this.selected = status;
		this.statusSelect.emit(status);
	}
}
