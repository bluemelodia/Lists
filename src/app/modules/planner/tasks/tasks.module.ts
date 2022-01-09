import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ListComponent } from "./list/list.component";
import { TasksComponent } from "./tasks.component";

import { DirectiveModule } from "../../../directives/directives.module";
import { ElementModule } from "../../element/element.module";
import { FormElementModule } from "../../form/form.module";
import { IconsModule } from "../../icons/icons.module";
import { IndicatorModule } from "../../indicator/indicator.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { TaskTasksRoutingModule } from "./tasks-routing.module";

@NgModule({
	declarations: [
		ListComponent,
		TasksComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormElementModule,
		IconsModule,
		IndicatorModule,
		PipesModule,
		TaskTasksRoutingModule,
	],
	exports: [
		TasksComponent,
	]
})
export class TaskModule { }