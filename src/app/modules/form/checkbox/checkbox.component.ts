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

  constructor() { }

  get checkboxValue(): void {
  	return this.form.controls[this.checkboxName].value;
  }

  toggleChecked(event): void {
  	this.form.get(this.checkboxName).patchValue(
  		event.target.checked
  	);
  }
}
