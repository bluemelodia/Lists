import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionModule } from '../direction/direction.module';

import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav.component';

@NgModule({
	declarations: [
		MenuComponent,
		NavComponent,
	],
	imports: [
		CommonModule,
		DirectionModule,
	],
	exports: [
		NavComponent,
	]
})
export class NavModule { }
