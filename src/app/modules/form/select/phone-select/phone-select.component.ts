import { Component, ElementRef } from "@angular/core";

import { allCountries } from "../../../../constants/countries.constants";
import { CountryISO } from "../../../../constants/country-iso.constants";
import { Icon } from "../../../../constants/icons.constants";

import { SelectComponent } from "../select.component";

import { FocusService } from "../../../../services/focus.service";

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
	public icon = Icon;

	/** 
	 * Inherit the services from the base class,
	 * instead of declaring our own (by adding private).
	 */
	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	public filterCountries(query: string): void {
		console.log("==> filter: ", query);
	}

	public selectOption(option: CountryISO): void {
		this.showOptionList = false;
		this.form.patchValue({
			countryCode: `+ ${option}`
		});
	}
}