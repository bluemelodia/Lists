import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { FormElementModule } from "../form/form.module";
import { ScheduleRoutingModule } from "./schedule-routing.module";

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormElementModule,
		FormsModule,
		ScheduleRoutingModule,
	],
	exports: [
	]
})
export class ScheduleModule { }