import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import convert from 'image-file-resize';

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {
    private readonly MAX_WIDTH = 300;
    private readonly MAX_HEIGHT = 180;
    private readonly QUALITY = 0.5;

    private onImageCompressed$ = new Subject<File>();

    public get imageCompressed$(): Observable<File> {
        return this.onImageCompressed$.asObservable();
    }

    public compress(file: File) {
        var reader = new FileReader;

        reader.onload = () => { // file is loaded
          var img = new Image;
      
          img.onload = () => {
           /**
            * Image is loaded, size information is available.
            */
            const width = img.width;
            const height = img.width;
            const ratio = this.calculateRatio(width, height);
            this.convertImage(file, width * ratio, height * ratio);
          };
      
          img.src = reader.result as string; // is the data URL because called with readAsDataURL
        };
        reader.readAsDataURL(file);       
    }

    private calculateRatio(width: number, height: number): number {
        let ratio = this.QUALITY;

        /**
         * Perform the compression along the greater dimension.
         */
        if (height > width) {
          let finalHeight = height > this.MAX_HEIGHT ? this.MAX_HEIGHT : height;
          ratio = finalHeight / height;

        } else {
          let finalWidth = width > this.MAX_WIDTH ? this.MAX_WIDTH : width;
          ratio = finalWidth / width;
        }
        console.info("📷 ✅ CompressImageService computed computed ratio: ", ratio);
        return ratio;
    }

    private convertImage(file, width: number, height: number) {
      convert({ 
        file: file,  
        width: width, 
        height: height, 
        type: 'jpeg'
      }).then(resp => {
            // Response contains the compressed and resized file
            console.info("📷 ✅ CompressImageService successfully compressed image: ", resp);
            this.onImageCompressed$.next(resp);
      }).catch(error => {
            // Error
            console.info("📷 ✅ CompressImageService failed to compress image.");
            this.onImageCompressed$.next(null);
      })
    }
}