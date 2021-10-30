import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HeadingComponent } from "./heading/heading.component";
import { LoaderComponent } from "./loader/loader.component";
import { NoResultsComponent } from "./no-results/no-results.component";
import { NoItemsComponent } from './no-items-found/no-items.component';

@NgModule({
	declarations: [
		HeadingComponent,
		LoaderComponent,
		NoItemsComponent,
		NoResultsComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
	],
	exports: [
		HeadingComponent,
		LoaderComponent,
		NoItemsComponent,
		NoResultsComponent
	]
})
export class ElementModule { }