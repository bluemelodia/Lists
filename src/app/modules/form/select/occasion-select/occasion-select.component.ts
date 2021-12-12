import { Component } from '@angular/core';

import { SelectComponent } from '../select.component';

import { Occasion } from '../../../../constants/occasions.constants';
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
	public occasions = Object.keys(Occasion);
	
	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	public get occasionForm() {
		return this.form.get('occasion');
	}

	public selectOption(occasion: Occasion): void {
		this.showOptionList = false;
		this.occasionForm.patchValue({
			occasion
		});
	}
}
