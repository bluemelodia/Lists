import { Component } from '@angular/core';

import { SelectComponent } from '../select.component';
import { ClickService } from '../../../../services/click.service';
import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-occasion-select',
	templateUrl: './occasion-select.component.html',
	styleUrls: [
		'../select.component.css',
		'./occasion-select.component.css'
	]
})
export class OccasionSelectComponent extends SelectComponent {
	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	/*selectOption(recipient: AddRecipient): void {
		console.log("===> selected: ", recipient);
		this.showOptionList = false;
		this.form.get("recipient").patchValue({
			recipient
		});
	}*/
}
