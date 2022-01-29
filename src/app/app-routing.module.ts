import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth-guard";
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
		path: "home",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
	},
	{
		path: "events",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/event/event.module").then(m => m.AddEventModule)
	},
	{
		path: "birthdays",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/planner/birthdays/birthdays.module").then(m => m.BirthdayModule)
	},
	{
		path: "gifts",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/planner/gifts/gifts.module").then(m => m.GiftModule)
	},
	{
		path: "meetings",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/planner/meetings/meetings.module").then(m => m.MeetingModule)
	},
	{
		path: "settings",
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule)
	},
	{
		path: "tasks",
		canActivate: [AuthGuard],
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