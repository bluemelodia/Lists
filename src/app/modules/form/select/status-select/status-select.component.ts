import { AfterViewInit, Component, ElementRef } from '@angular/core';
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
export class StatusSelectComponent extends SelectComponent implements AfterViewInit {
	public selected: Status = Status.NotStarted;
	public status = Status;
	public statusKeys = Object.keys(this.status);
	
	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public ngAfterViewInit(): void {
		if (this.statusForm) {
			this.selected = this.statusForm?.value;
		}
	}

	public get statusForm(): AbstractControl {
		return this.form.controls.taskStatus;
	}

	public selectOption(status: Status): void {
		this.showOptionList = false;

		this.selected = status;
		this.statusForm.patchValue(status);
	}
}