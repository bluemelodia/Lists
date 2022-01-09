import { Component, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Status } from '../../../../constants/tasks.constants';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'app-status-select',
	templateUrl: './status-select.component.html',
	styleUrls: [
		'../select.component.css',
		'./status-select.component.css'
	]
})
export class StatusSelectComponent extends SelectComponent {
	public selected: Status;
	public status = Status;
	public statusKeys = Object.keys(this.status);
	
	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}


	public get statusForm(): AbstractControl {
		return this.form.controls.taskSelect;
	}

	public selectOption(status: Status): void {
		this.selected = status;
		this.statusForm.patchValue(status);
	}
}