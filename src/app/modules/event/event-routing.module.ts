import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddBirthdayComponent } from "./birthday/add-birthday/add.component";
import { AddMeetingComponent } from "./meeting/add-meeting/add.component";

const routes: Routes = [
	{
		path: "add-birthday",
		component: AddBirthdayComponent,
	},
	{
		path: "edit-birthday",
		component: AddBirthdayComponent,
	},
	{
		path: "add-meeting",
		component: AddMeetingComponent,
	},
	{
		path: "edit-meeting",
		component: AddMeetingComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventRoutingModule { }