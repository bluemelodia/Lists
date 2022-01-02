import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddGiftComponent } from "./gift/add-gift/add.component";
import { AddMeetingComponent } from "./meeting/add-meeting/add.component";
import { AddRecipientComponent } from "./recipient/add-recipient/add.component";
import { AddTaskComponent } from "./task/add-task/add.component";

const routes: Routes = [
	{
		path: "add-gift",
		component: AddGiftComponent,
	},
	{
		path: 'edit-gift',
		component: AddGiftComponent,
	},
	{
		path: "add-meeting",
		component: AddMeetingComponent,
	},
	{
		path: "edit-meeting",
		component: AddMeetingComponent,
	},
	{
		path: "add-recipient",
		component: AddRecipientComponent,
	},
	{
		path: "edit-recipient",
		component: AddRecipientComponent,
	},
	{
		path: "add-task",
		component: AddTaskComponent,
	},
	{
		path: "edit-task",
		component: AddTaskComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventRoutingModule { }