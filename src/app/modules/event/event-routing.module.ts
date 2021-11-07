import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddBirthdayComponent } from "./birthday/add-birthday/add.component";
import { AddGiftComponent } from "./gift/add-gift/add.component";
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
	},
	{
		path: "add-gift",
		component: AddGiftComponent,
	},
	{
		path: 'edit-gift',
		component: AddGiftComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventRoutingModule { }