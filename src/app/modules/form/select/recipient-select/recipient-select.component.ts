import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';
import { SelectComponent } from '../select.component';

import { ClickService } from '../../../../services/click.service';
import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-recipient-select',
	templateUrl: './recipient-select.component.html',
	styleUrls: [
		"../select.component.css",
		'recipient-select.component.css'
	]
})
export class RecipientSelectComponent extends SelectComponent {
	@Input() list: AddRecipient[];
	@Input() useForm: true;
	@Output() onRecipientSelect = new EventEmitter<AddRecipient>();
	@Output() onFilterReset = new EventEmitter<void>();

	public selectedRecipient: AddRecipient;

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	public get recipientForm() {
		return this.form?.get('recipient');
	}

	public clearFilter(): void {
		this.recipientForm?.patchValue({
			recipient: null
		});
		this.selectedRecipient = null;
		this.onFilterReset.emit();
	}

	public selectOption(recipient: AddRecipient): void {
		console.log("===> selected: ", recipient);
		this.showOptionList = false;
		this.recipientForm?.patchValue({
			recipient
		});
		this.selectedRecipient = recipient;
		this.onRecipientSelect.emit(recipient);
	}
}
