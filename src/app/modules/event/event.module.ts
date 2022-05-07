import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DirectiveModule } from "../../directives/directives.module";
import { ElementModule } from "../element/element.module";
import { EventRoutingModule } from "./event-routing.module";
import { FormElementModule } from "../form/form.module";
import { ImageModule } from "../image/image.module";

import { AddRecipientComponent } from "./add-recipient/add-recipient.component";
import { AddGiftComponent } from "./add-gift/add-gift.component";
import { AddMeetingComponent } from "./add-meeting/add-meeting.component";
import { AddTaskComponent } from "./add-task/add-task.component";

@NgModule({
	declarations: [
		AddRecipientComponent,
		AddGiftComponent,
		AddMeetingComponent,
		AddTaskComponent,
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
		AddTaskComponent,
	]
})
export class AddEventModule { }