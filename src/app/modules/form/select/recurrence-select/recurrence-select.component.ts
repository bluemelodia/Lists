import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Recurrence, RecurrenceMap } from '../../../../constants/tasks.constants';

import { SelectComponent } from '../select.component';

import { FocusService } from '../../../../services/focus.service';

@Component({
	selector: 'ml-recurrence-select',
	templateUrl: './recurrence-select.component.html',
	styleUrls: [
		'../select.component.css',
		'./recurrence-select.component.css'
	]
})
export class RecurrenceSelectComponent extends SelectComponent implements AfterViewInit {
	public recurrence = Recurrence;
	public recurrenceKeys = Object.keys(this.recurrence);
	public selected: RecurrenceMap = {};

	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);


	}

	public ngAfterViewInit(): void {
		this.constructSelectionMap();
	}

	private constructSelectionMap() {
		if (!this.recurrenceForm?.value) {
			Object.keys(this.recurrence).forEach((key: string) => {
				this.selected[key] = false;
			});
		} else {
			this.selected = this.recurrenceForm?.value;
		}
	}

	public get recurrenceForm(): AbstractControl {
		return this.form.controls.taskRecurrence;
	}

	private selectOne(selectedRecurrence: Recurrence): void {
		for (const recurrence of Object.keys(this.selected)) {
			if (recurrence !== selectedRecurrence) {
				this.selected[recurrence] = false;
			}
		}
	}

	private selectDaily(): void {
		for (const recurrence of Object.keys(this.selected)) {
			if (recurrence === Recurrence.Once
				|| recurrence === Recurrence.Daily
				|| recurrence === Recurrence.Monthly) {
				this.selected[recurrence] = false;
			}
		}
	}

	public selectOption(recurrence: Recurrence): void {
		this.showOptionList = false;
		this.selected[recurrence] = !this.selected[recurrence];

		switch (recurrence) {
			case Recurrence.Once:
			case Recurrence.Daily:
			case Recurrence.Monthly:
				this.selectOne(recurrence);
				break;
			case Recurrence.Sunday:
			case Recurrence.Monday:
			case Recurrence.Tuesday:
			case Recurrence.Wednesday:
			case Recurrence.Thursday:
			case Recurrence.Friday:
			case Recurrence.Saturday:
				this.selectDaily();
				break;
		}

		this.recurrenceForm.patchValue(this.selected);
	}

	public getSelectedOptions(): string {
		const selected = [];
		for (const recurrence of Object.keys(this.selected)) {
			if (this.selected[recurrence]) {
				selected.push(recurrence);
			}
		}

		return selected.join(", ");
	}
}