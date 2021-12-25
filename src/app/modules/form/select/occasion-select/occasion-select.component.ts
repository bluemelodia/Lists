import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Occasion } from '../../../../constants/occasions.constants';

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
	public occasions = Occasion;
	public occasionKeys = Object.keys(Occasion);
	
	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	public get occasionForm(): AbstractControl {
		return this.form.controls.giftOccasion;
	}

	public selectOption(occasion: Occasion): void {
		this.showOptionList = false;
		this.occasionForm.patchValue(occasion);
	}
}
