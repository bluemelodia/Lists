import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { EventRoutingModule } from "./event-routing.module";
import { FormElementModule } from "../form/form.module";
import { ImageModule } from "../image/image.module";

import { AddRecipientComponent } from "./recipient/add-recipient/add.component";
import { AddGiftComponent } from "./gift/add-gift/add.component";
import { AddMeetingComponent } from "./meeting/add-meeting/add.component";

@NgModule({
	declarations: [
		AddRecipientComponent,
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
		AddRecipientComponent,
		AddGiftComponent,
		AddMeetingComponent,
	]
})
export class AddEventModule { }