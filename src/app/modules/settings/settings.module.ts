import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { ElementModule } from '../element/element.module';
import { FormElementModule } from '../form/form.module';
import { DirectiveModule } from 'src/app/directives/directives.module';

@NgModule({
	declarations: [
		SettingsComponent,
	],
	imports: [
		CommonModule,
		DirectiveModule,
		ElementModule,
		FormElementModule,
		FormsModule,
		ReactiveFormsModule,
		SettingsRoutingModule,
	],
	exports: [
		SettingsComponent,
	]
})
export class SettingsModule { }