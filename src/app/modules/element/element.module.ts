import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeadingComponent } from "./heading/heading.component";
import { LoaderComponent } from "./loader/loader.component";
import { NoResultsComponent } from "./no-results/no-results.component";

@NgModule({
	declarations: [
		HeadingComponent,
		LoaderComponent,
		NoResultsComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		HeadingComponent,
		LoaderComponent,
		NoResultsComponent
	]
})
export class ElementModule { }