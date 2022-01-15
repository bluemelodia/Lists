/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@angular/core"
import { Observable, Subject, timer } from "rxjs"
import convert from "image-file-resize";
import { take, takeUntil } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable({
	providedIn: "root"
})
export class CompressImageService {
	private readonly MAX_WIDTH = 167;
	private readonly MAX_HEIGHT = 100;
	private readonly QUALITY = 0.5;

	private onImageCompressed$ = new Subject<File>();
	private onImageLoadTimeout$ = new Subject<void>();

	public get imageCompressed$(): Observable<File> {
		return this.onImageCompressed$.asObservable();
	}

	constructor(
		private loadingService: LoadingService
	) {}

	/**
	* Converts the file to its base64 representation.
	* Source: https://tutorialsforangular.com/2020/12/17/converting-files-to-base64-in-angular/
	*/
	public convertFileToBase64(file: File): Observable<string> {
		const result = new Subject<string>();
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = (event) => {
			console.info("[Compress Image Service] Converted image to base64 string.");
			result.next(btoa(event.target.result.toString()))
		};
		return result;
	}

	public compress(file: File): void {
		const reader = new FileReader;
		this.loadingService.startLoading();

		timer(10000)
			.pipe(
				take(1),
				takeUntil(this.onImageLoadTimeout$)
			)
			.subscribe(() => {
				console.info("[Compress Image Service] Compress operation timed out. Image was not loaded in time.");
				this.loadingService.stopLoading();
				this.onImageCompressed$.next(null);
			})

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
				
				console.info(`[Compress Image Service] Converting image. Width -> ${finalWidth}, Height -> ${finalHeight}.`);
				this.onImageLoadTimeout$.next();
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

		console.info("[Compress Image Service] Calculating compression ratio: ", ratio);
		return ratio;
	}

	private convertImage(file, width: number, height: number) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		convert({
			file: file,
			width: width,
			height: height,
			type: "jpeg"
		}).then(resp => {
			// Response contains the compressed and resized file
			this.loadingService.stopLoading();
			this.onImageCompressed$.next(resp);
		}).catch((error) => {
			// Error
			console.info("[Compress Image Service] Unable to compress image. Error: ", error);
			this.loadingService.stopLoading();
			this.onImageCompressed$.next(null);
		})
	}
}