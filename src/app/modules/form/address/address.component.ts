import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { countries, CountryData } from './constants/countries';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() selected: CountryData = countries['US'];

	public countries = countries;

	constructor() { }

	ngOnInit(): void {
	}

	public onCountrySelected(country: CountryData): void {
		console.log("selected: ", country);
		this.form.get("country").patchValue({
			name: country.name,
			countryCode: country.code,
		});
	}
}
