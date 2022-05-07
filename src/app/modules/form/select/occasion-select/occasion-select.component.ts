import { Component, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Occasion } from '../../../../constants/occasions.constants';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'ml-occasion-select',
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
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public get occasionForm(): AbstractControl {
		return this.form.controls.giftOccasion;
	}

	public selectOption(occasion: Occasion): void {
		this.showOptionList = false;
		this.occasionForm.patchValue(occasion);
	}
}
