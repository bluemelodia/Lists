import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ErrorComponent } from "./error/error.component";
import { HeadingComponent } from "./heading/heading.component";
import { LoaderComponent } from "./loader/loader.component";
import { NoResultsComponent } from "./no-results/no-results.component";
import { NoItemsComponent } from './no-items-found/no-items.component';

@NgModule({
	declarations: [
		HeadingComponent,
		ErrorComponent,
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
		ErrorComponent,
		LoaderComponent,
		NoItemsComponent,
		NoResultsComponent
	]
})
export class ElementModule { }