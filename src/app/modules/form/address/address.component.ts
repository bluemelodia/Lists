import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { countries } from './constants/countries';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
	@Input() form: FormGroup;

	public countries = countries;

	constructor() { }

	ngOnInit(): void {
	}

	public onCountrySelected(country: string): void {
		console.log("selected: ", country);
	}
}
