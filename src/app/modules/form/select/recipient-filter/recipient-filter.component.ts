import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-recipient-filter',
	templateUrl: './recipient-filter.component.html',
	styleUrls: [
		"../select.component.css",
		'recipient-filter.component.css'
	]
})
export class RecipientFilterComponent extends SelectComponent {
	@Input() list: AddRecipient[];

	@Output() onRecipientSelect = new EventEmitter<AddRecipient>();
	@Output() filterReset = new EventEmitter<void>();

	public selectedRecipient: AddRecipient;

	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public clearFilter(): void {
		this.selectedRecipient = null;
		this.filterReset.emit();
	}

	public selectOption(recipient: AddRecipient): void {
		this.showOptionList = false;
		this.selectedRecipient = recipient;
		this.onRecipientSelect.emit(recipient);
	}
}
