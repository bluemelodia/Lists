import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BirthdaysComponent } from "./birthdays.component";
import { ListComponent } from "./list/list.component";

import { BirthdayTasksRoutingModule } from "./birthdays-routing.module";
import { IconsModule } from "../../icons/icons.module";
import { DirectiveModule } from "../../../directives/directives.module";
import { ElementModule } from "../../element/element.module";
import { IndicatorModule } from "../../indicator/indicator.module";

@NgModule({
	declarations: [
		BirthdaysComponent,
		ListComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		IconsModule,
		BirthdayTasksRoutingModule,
		IndicatorModule,
	],
	exports: [
	]
})
export class BirthdayModule { }