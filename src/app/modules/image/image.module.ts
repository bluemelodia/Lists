import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "./image-upload/upload.component";
import { ReactiveFormsModule } from "@angular/forms";

import { IconsModule } from "../icons/icons.module";

@NgModule({
	declarations: [
		ImageUploadComponent,
	],
	imports: [
		CommonModule,
		IconsModule,
		ReactiveFormsModule,
	],
	exports: [
		ImageUploadComponent,
	],
})
export class ImageModule { }
