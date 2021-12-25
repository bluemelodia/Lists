import { Component } from "@angular/core";

import { allCountries } from "../../../../constants/countries.constants";
import { CountryISO } from "../../../../constants/country-iso.constants";
import { Icon } from "../../../../constants/icons.constants";
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
	public icon = Icon;

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
		console.info("===> selected: ", option, this.form.value);
		this.showOptionList = false;
		this.form.patchValue({
			countryCode: `+ ${option}`
		});
	}
}