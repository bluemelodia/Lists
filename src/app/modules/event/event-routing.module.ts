import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddGiftComponent } from "./add-gift/add-gift.component";
import { AddMeetingComponent } from "./add-meeting/add-meeting.component";
import { AddRecipientComponent } from "./add-recipient/add-recipient.component";
import { AddTaskComponent } from "./add-task/add-task.component";

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