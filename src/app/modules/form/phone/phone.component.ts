import {
	Component,
	Input,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { CountryISO } from "../../../constants/country-iso.constants";

@Component({
	selector: "app-phone",
	templateUrl: "./phone.component.html",
	styleUrls: ["./phone.component.css"]
})
export class PhoneComponent {
	@Input() form: FormGroup;
	@Input() startingCountry: CountryISO;
	public country;
}
