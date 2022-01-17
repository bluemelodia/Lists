import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ElementModule } from "./modules/element/element.module";

/**
 * Lazy load most components, since the user may not visit most of these pages during
 * any given session.
 */
const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'signup',
		component: RegisterComponent,
	},
	{
		path: "events",
		loadChildren: () => import("./modules/event/event.module").then(m => m.AddEventModule)
	},
	{
		path: "birthdays",
		loadChildren: () => import("./modules/planner/birthdays/birthdays.module").then(m => m.BirthdayModule)
	},
	{
		path: "gifts",
		loadChildren: () => import("./modules/planner/gifts/gifts.module").then(m => m.GiftModule)
	},
	{
		path: "meetings",
		loadChildren: () => import("./modules/planner/meetings/meetings.module").then(m => m.MeetingModule)
	},
	{
		path: "settings",
		loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule)
	},
	{
		path: "tasks",
		loadChildren: () => import("./modules/planner/tasks/tasks.module").then(m => m.TaskModule)
	},
	{
		path: '**',
		component: LoginComponent
	}
];

@NgModule({
	imports: [
		ElementModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }