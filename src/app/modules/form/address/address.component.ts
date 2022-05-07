import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'ml-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent {
	@Input() form: FormGroup;
}
