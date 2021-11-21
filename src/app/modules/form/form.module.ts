import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
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
import { CountrySelectComponent } from './select/select.component';

@NgModule({
	declarations: [
		AddressComponent,
		CheckboxComponent,
		DatepickerComponent,
		PhoneComponent,
		RadioComponent,
		CountrySelectComponent,
	],
	imports: [
		CalendarModule,
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormsModule,
		NgxIntlTelInputModule,
		NgxMaterialTimepickerModule,
		PipesModule,
		ReactiveFormsModule,
	],
	exports: [
		AddressComponent,
		CheckboxComponent,
		DatepickerComponent,
		NgxMaterialTimepickerModule,
		PhoneComponent,
		RadioComponent,
	],
	providers: [
		PickerDateFormatterPipe,
	]
})
export class FormElementModule { }
