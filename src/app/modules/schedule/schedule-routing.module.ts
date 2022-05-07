import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventCalendarComponent } from "./event-calendar/event-calendar.component";

const routes: Routes = [
	{
		path: "",
		component: EventCalendarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ScheduleRoutingModule { }
