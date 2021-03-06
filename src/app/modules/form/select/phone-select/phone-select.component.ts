import { Component, ElementRef } from "@angular/core";

import { allCountries } from "../../../../constants/countries.constants";
import { CountryISO } from "../../../../constants/country-iso.constants";
import { Icon } from "../../../../constants/icons.constants";

import { SelectComponent } from "../select.component";

import { FocusService } from "../../../../services/focus.service";

@Component({
	selector: "ml-phone-select",
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
		const searchStr = query.toLocaleLowerCase();
		this.countries = allCountries.filter((country: string[]) => {
			return country[0].toLocaleLowerCase().includes(searchStr);
		});
	}

	public resetFilter(): void {
		this.countries = allCountries;
	}

	public selectOption(country: string, option: CountryISO): void {
		this.showOptionList = false;
		this.resetFilter();
		this.form.patchValue({
			countryCode: `+ ${option}`,
			country
		});
		console.log("Selected: ", this.form);
	}
}