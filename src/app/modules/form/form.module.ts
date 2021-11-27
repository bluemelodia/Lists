import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { CalendarModule } from "../calendar/calendar.module";
import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { PipesModule } from "../../pipes/pipes.module";
import { PickerDateFormatterPipe } from "../../pipes/picker-date-formatter.pipe";

import { AddressComponent } from "./address/address.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { RadioComponent } from "./radio/radio.component";
import { PhoneComponent } from "./phone/phone.component";
import { CountrySelectComponent } from "./select/country-select/country-select.component";
import { SelectComponent } from './select/select.component';

@NgModule({
	declarations: [
		AddressComponent,
		CheckboxComponent,
		CountrySelectComponent,
		DatepickerComponent,
		PhoneComponent,
		RadioComponent,
		SelectComponent,
	],
	imports: [
		CalendarModule,
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormsModule,
		NgxMaterialTimepickerModule,
		PipesModule,
		ReactiveFormsModule,
	],
	exports: [
		AddressComponent,
		CheckboxComponent,
		CountrySelectComponent,
		DatepickerComponent,
		NgxMaterialTimepickerModule,
		PhoneComponent,
		RadioComponent,
		SelectComponent,
	],
	providers: [
		PickerDateFormatterPipe,
	]
})
export class FormElementModule { }
