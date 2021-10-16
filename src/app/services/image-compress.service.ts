/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import convert from "image-file-resize";

@Injectable({
	providedIn: "root"
})
export class CompressImageService {
	private readonly MAX_WIDTH = 300;
	private readonly MAX_HEIGHT = 180;
	private readonly QUALITY = 0.5;

	private onImageCompressed$ = new Subject<File>();

	public get imageCompressed$(): Observable<File> {
		return this.onImageCompressed$.asObservable();
	}

	/**
	* Converts the file to its base64 representation.
	* Source: https://tutorialsforangular.com/2020/12/17/converting-files-to-base64-in-angular/
	*/
	public convertFileToBase64(file: File): Observable<string> {
		const result = new Subject<string>();
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = (event) => {
			// console.info("📷 ✅ CompressImageService ---> convertFileToBase64, converted to base64 string.");
			result.next(btoa(event.target.result.toString()))
		};
		return result;
	}

	public compress(file: File): void {
		const reader = new FileReader;

		reader.onload = () => { // file is loaded
			const img = new Image;

			img.onload = () => {
				/**
				* Image is loaded, size information is available.
				*/
				const width = img.width;
				const height = img.height;
				const ratio = this.calculateRatio(width, height);

				const finalWidth = width * ratio;
				const finalHeight = height * ratio;
				// console.info(`📷 ✅ CompressImageService ---> compress, width -> ${finalWidth}, height -> ${finalHeight}.`);
				this.convertImage(file, finalWidth, finalHeight);
			};

			img.src = reader.result as string; // is the data URL because called with readAsDataURL
		};
		reader.readAsDataURL(file);
	}

	private calculateRatio(width: number, height: number): number {
		let ratio = this.QUALITY;

		const finalHeight = height > this.MAX_HEIGHT ? this.MAX_HEIGHT : height;
		ratio = finalHeight / height;

		if (width > height) {
			const finalWidth = width > this.MAX_WIDTH ? this.MAX_WIDTH : width;
			const widthRatio = finalWidth / width;
			if (widthRatio > ratio) {
				ratio = widthRatio;
			}
		}

		// console.info("📷 ✅ CompressImageService ---> calculateRatio, computed compression ratio: ", ratio);
		return ratio;
	}

	private convertImage(file, width: number, height: number) {
		convert({
			file: file,
			width: width,
			height: height,
			type: "jpeg"
		}).then(resp => {
			// Response contains the compressed and resized file
			// console.info("📷 ✅ CompressImageService ---> convertImage, successfully compressed image: ", resp);
			this.onImageCompressed$.next(resp);
		}).catch(() => {
			// Error
			// console.info("📷 ✅ CompressImageService ---> convertImage, failed to compress image.");
			this.onImageCompressed$.next(null);
		})
	}
}