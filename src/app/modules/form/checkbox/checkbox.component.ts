import { Component, EventEmitter, Input, Output, } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.css"]
})
export class CheckboxComponent {
	@Input() checkboxName: string;
	@Input() form: FormGroup;
	@Input() name: string;

	@Output() valueChanged = new EventEmitter<boolean>();

	get checkboxValue(): void {
		return this.form.controls[this.checkboxName].value;
	}

	toggleChecked(event: any): void {
		this.form.get(this.checkboxName).patchValue(
			event.target.checked
		);
		this.valueChanged.emit(event.target.checked);
	}
}
