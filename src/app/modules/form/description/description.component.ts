import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HeaderLevel } from '../../../interfaces/header.interface';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
	@Input() submitted;
	@Input() form: FormGroup;
	@Input() controlName: string = "";
	@Input() formInstructions: string;
	@Input() maxChars = 1000;

	public headerLevel = HeaderLevel;

	constructor() { }

	ngOnInit(): void {
	}
}
