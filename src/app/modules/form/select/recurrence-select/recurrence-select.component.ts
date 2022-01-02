import { Component, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Recurrence } from '../../../../constants/tasks.constants';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-recurrence-select',
	templateUrl: './recurrence-select.component.html',
	styleUrls: [
		'../select.component.css',
		'./recurrence-select.component.css'
	]
})
export class RecurrenceSelectComponent extends SelectComponent {
	public recurrence = Recurrence;
	public recurrenceKeys = Object.keys(this.recurrence);
	
	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public get recurrenceForm(): AbstractControl {
		return this.form.controls.taskRecurrence;
	}

	public selectOption(recurrence: Recurrence): void {
		this.showOptionList = false;
		this.recurrenceForm.patchValue(recurrence);
	}
}