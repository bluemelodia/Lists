import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth-guard';
import { ElementModule } from './modules/element/element.module';

/**
 * Lazy load most components, since the user may not visit most of these pages during
 * any given session.
 */
const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			title: 'Login',
		}
	},
	{
		path: 'signup',
		component: RegisterComponent,
		data: {
			title: 'Register',
		}
	},
	{
		path: 'forgot',
		component: ForgotComponent,
		data: {
			title: 'Reset Password'
		}
	},
	{
		path: 'home',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
		data: {
			title: 'Home'
		}
	},
	{
		path: 'calendar',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
	},
	{
		path: 'events',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/event/event.module').then(m => m.AddEventModule)
	},
	{
		path: 'birthdays',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/planner/birthdays/birthdays.module').then(m => m.BirthdayModule)
	},
	{
		path: 'gifts',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/planner/gifts/gifts.module').then(m => m.GiftModule)
	},
	{
		path: 'meetings',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/planner/meetings/meetings.module').then(m => m.MeetingModule)
	},
	{
		path: 'settings',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
	},
	{
		path: 'tasks',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/planner/tasks/tasks.module').then(m => m.TaskModule)
	},
	{
		path: '**',
		component: LoginComponent
	}
];

@NgModule({
	imports: [
		ElementModule,
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }