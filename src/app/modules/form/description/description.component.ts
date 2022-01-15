import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormLimit } from '../../../constants/gifts.constants';

import { HeaderLevel } from '../../../interfaces/header.interface';

@Component({
	selector: 'app-description',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
	@Input() submitted;
	@Input() form: FormGroup;
	@Input() controlName = "";
	@Input() formInstructions: string;
	@Input() maxChars = FormLimit.Description.max;

	public headerLevel = HeaderLevel;
}
