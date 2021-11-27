import { Component } from "@angular/core";
import { CountryISO } from "src/app/constants/country-iso.constants";

import { allCountries } from "../../../../constants/countries.constants";
import { ClickService } from "../../../../services/click.service";
import { FocusService } from "../../../../services/focus.service";

import { SelectComponent } from "../select.component";

@Component({
	selector: "app-phone-select",
	templateUrl: "./phone-select.component.html",
	styleUrls: [
		"../select.component.css",
		"./phone-select.component.css"
	]
})
export class PhoneSelectComponent extends SelectComponent {
	public countries = allCountries;
	
	/** 
	 * Inherit the services from the base class,
	 * instead of declaring our own (by adding private).
	 */
	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	selectOption(option: CountryISO): void {
		console.log("===<. selected: ", option, this.form.get('phone')?.value);
		this.showOptionList = false;
		this.form.get("phone").patchValue({
			countryCode: option
		});
	}
}