/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
	@Input() name: string;
	@Input() checkboxName: string;
	@Input() form: FormGroup;

	get checkboxValue(): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.form.controls[this.checkboxName].value;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toggleChecked(event: any): void {
		this.form.get(this.checkboxName).patchValue(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			event.target.checked
		);
	}
}
