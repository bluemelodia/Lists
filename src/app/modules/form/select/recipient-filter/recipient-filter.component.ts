import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { Icon } from '../../../../constants/icons.constants';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'ml-recipient-filter',
	templateUrl: './recipient-filter.component.html',
	styleUrls: [
		"../select.component.css",
		'recipient-filter.component.css'
	]
})
export class RecipientFilterComponent extends SelectComponent {
	@Input() list: AddRecipient[];

	@Output() recipientSelected = new EventEmitter<AddRecipient>();
	@Output() filterReset = new EventEmitter<void>();

	public icon = Icon;
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
		this.recipientSelected.emit(recipient);
	}
}
