import { CommonModule } from "@angular/common";

import { DirectiveModule } from "../../../directives/directives.module";
import { ElementModule } from "../../element/element.module";
import { IconsModule } from "../../icons/icons.module";
import { IndicatorModule } from "../../indicator/indicator.module";
import { PipesModule } from "../../../pipes/pipes.module";

import { TasksComponent } from "./tasks.component";
import { NgModule } from "@angular/core";
import { TaskTasksRoutingModule } from "./tasks-routing.module";

@NgModule({
	declarations: [
		TasksComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
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