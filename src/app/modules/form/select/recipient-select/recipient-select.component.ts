import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'ml-recipient-select',
	templateUrl: './recipient-select.component.html',
	styleUrls: [
		"../select.component.css",
		'recipient-select.component.css'
	]
})
export class RecipientSelectComponent extends SelectComponent {
	@Input() list: AddRecipient[];

	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public get recipientForm(): AbstractControl {
		return this.form.controls.giftRecipient;
	}

	public selectOption(recipient: AddRecipient): void {
		this.showOptionList = false;

		this.recipientForm?.patchValue(recipient);
	}
}
