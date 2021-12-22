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
	@Input() useFilter: false;
	@Output() onRecipientSelect = new EventEmitter<AddRecipient>();

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	public get recipientForm() {
		return this.form.get('recipient');
	}

	public selectOption(recipient: AddRecipient): void {
		console.log("===> selected: ", recipient);
		this.showOptionList = false;
		this.recipientForm.patchValue({
			recipient
		});
		this.onRecipientSelect.emit(recipient);
	}
}
