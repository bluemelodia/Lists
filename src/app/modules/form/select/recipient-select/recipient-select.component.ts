import { Component, Input } from '@angular/core';

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

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	selectOption(recipient: AddRecipient): void {
		console.log("===> selected: ", recipient);
		this.showOptionList = false;
		this.form.get("recipient").patchValue({
			recipient
		});
	}
}
