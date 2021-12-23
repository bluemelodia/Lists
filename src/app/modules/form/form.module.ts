import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { CalendarModule } from "../calendar/calendar.module";
import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { IconsModule } from "../icons/icons.module";
import { PipesModule } from "../../pipes/pipes.module";
import { PickerDateFormatterPipe } from "../../pipes/picker-date-formatter.pipe";

import { AddressComponent } from "./address/address.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { RadioComponent } from "./radio/radio.component";

import { CountrySelectComponent } from "./select/country-select/country-select.component";
import { DescriptionComponent } from "./description/description.component";
import { SelectComponent } from './select/select.component';
import { OccasionSelectComponent } from './select/occasion-select/occasion-select.component';
import { PhoneSelectComponent } from "./select/phone-select/phone-select.component";
import { RecipientFilterComponent } from "./select/recipient-filter/recipient-filter.component";
import { RecipientSelectComponent } from './select/recipient-select/recipient-select.component';
import { SortSelectComponent } from "./select/sort-select/sort-select.component";

@NgModule({
	declarations: [
		AddressComponent,
		CheckboxComponent,
		CountrySelectComponent,
		DatepickerComponent,
		DescriptionComponent,
		OccasionSelectComponent,
		PhoneSelectComponent,
		RadioComponent,
		SelectComponent,
		RecipientFilterComponent,
  		RecipientSelectComponent,
		SortSelectComponent,
	],
	imports: [
		CalendarModule,
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormsModule,
		IconsModule,
		NgxMaterialTimepickerModule,
		PipesModule,
		ReactiveFormsModule,
	],
	exports: [
		AddressComponent,
		CheckboxComponent,
		CountrySelectComponent,
		DatepickerComponent,
		DescriptionComponent,
		NgxMaterialTimepickerModule,
		OccasionSelectComponent,
		PhoneSelectComponent,
		RadioComponent,
		RecipientFilterComponent,
		RecipientSelectComponent,
		SelectComponent,
		SortSelectComponent,
	],
	providers: [
		PickerDateFormatterPipe,
	]
})
export class FormElementModule { }
