import {
	Component,
	Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

import {
	PREFERRED_COUNTRIES,
	SEARCH_COUNTRY_FIELDS,
	STARTING_COUNTRY,
} from './constants/phone.constants';

@Component({
	selector: 'app-phone',
	templateUrl: './phone.component.html',
	styleUrls: ['./phone.component.css']
})
export class PhoneComponent {
	@Input() form: FormGroup;
	@Input() set startingCountry(country: string) {
		this.country = this.getStartingCountry(country);
	} 
	public country;

	public phoneNumberFormat = PhoneNumberFormat;
	public preferredCountries = PREFERRED_COUNTRIES;
	public searchCountryFields = SEARCH_COUNTRY_FIELDS;

	private getStartingCountry(country: string): CountryISO {
		let startingCountry = STARTING_COUNTRY;

		Object.keys(CountryISO).forEach((countryKey: string) => {
			if (country?.toLowerCase() === CountryISO[countryKey]) {
				startingCountry = CountryISO[countryKey];
			}
		});

		return startingCountry;
	}
}
