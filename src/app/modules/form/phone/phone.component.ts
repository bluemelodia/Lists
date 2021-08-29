import { 
	Component,
	Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PhoneNumberFormat } from 'ngx-intl-tel-input';

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

	public phoneNumberFormat = PhoneNumberFormat;
	public preferredCountries = PREFERRED_COUNTRIES;
	public startingCountry = STARTING_COUNTRY;
	public searchCountryFields = SEARCH_COUNTRY_FIELDS;
}
