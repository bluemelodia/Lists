import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';
import { SelectComponent } from '../select.component';

import { ClickService } from '../../../../services/click.service';
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
	@Output() onFilterReset = new EventEmitter<void>();

	public selectedRecipient: AddRecipient;

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	public clearFilter(): void {
		this.selectedRecipient = null;
		this.onFilterReset.emit();
	}

	public selectOption(recipient: AddRecipient): void {
		console.info("===> selected: ", recipient);
		this.showOptionList = false;
		this.selectedRecipient = recipient;
		this.onRecipientSelect.emit(recipient);
	}
}
