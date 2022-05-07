import { Component, ElementRef } from "@angular/core";

import { CountryUtils } from "../../address/utils/countries.utils";

import { CountryData } from "../../../../constants/countries.constants";

import { SelectComponent } from "../select.component";

import { FocusService } from "../../../../services/focus.service";

@Component({
	selector: "ml-country-select",
	templateUrl: "./country-select.component.html",
	styleUrls: [
		"../select.component.css",
		"./country-select.component.css"
	]
})
export class CountrySelectComponent extends SelectComponent {
	public countries = CountryUtils.getCountries();

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

	selectOption(option: CountryData): void {
		this.showOptionList = false;
		this.form.get("country").patchValue({
			name: option.name,
			code: option.code,
		});
	}
}