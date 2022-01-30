import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SettingsComponent } from "./settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";

import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { FormElementModule } from "../form/form.module";

@NgModule({
	declarations: [
		SettingsComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormElementModule,
		FormsModule,
		ReactiveFormsModule,
		SettingsRoutingModule,
	],
	exports: [
	]
})
export class SettingsModule { }