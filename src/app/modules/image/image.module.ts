import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ImageUploadComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
	],
	exports: [
		ImageUploadComponent,
	],
})
export class ImageModule { }
