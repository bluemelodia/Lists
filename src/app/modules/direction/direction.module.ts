import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectionComponent } from './direction.component';

@NgModule({
	declarations: [
		DirectionComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		DirectionComponent,
	]
})
export class DirectionModule { }
