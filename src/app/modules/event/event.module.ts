import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { EventRoutingModule } from "./event-routing.module";
import { FormElementModule } from "../form/form.module";
import { ImageModule } from "../image/image.module";

import { AddBirthdayComponent } from "./birthday/add-birthday/add.component";
import { AddGiftComponent } from "./gift/add-gift/add.component";
import { AddMeetingComponent } from "./meeting/add-meeting/add.component";

@NgModule({
	declarations: [
		AddBirthdayComponent,
		AddGiftComponent,
		AddMeetingComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		EventRoutingModule,
		FormElementModule,
		FormsModule,
		ImageModule,
		ReactiveFormsModule,
	],
	exports: [
		AddBirthdayComponent,
		AddGiftComponent,
		AddMeetingComponent,
	]
})
export class AddEventModule { }