import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
	@Input() checkboxName: string;
	@Input() form: FormGroup;
	@Input() name: string;

	@Output() valueChanged = new EventEmitter<boolean>();

	get checkboxValue(): boolean {
		return this.form.controls[this.checkboxName].value as boolean;
	}

	toggleChecked(event): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const checked = event.target.checked as boolean;
		this.form.get(this.checkboxName).patchValue(
			checked
		);
		this.valueChanged.emit(checked);
	}
}
