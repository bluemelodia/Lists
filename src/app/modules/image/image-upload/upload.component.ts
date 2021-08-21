import { 
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { CompressImageService } from '../../../services/image-compress.service';

@Component({
  selector: 'app-img-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;

  @ViewChild('imageInput') filePicker: ElementRef;

  public selectedImageUrl$ = new Subject<string>();
  private ngUnsubscribe$ = new Subject<void>();

  private readonly base64Prefix = "data:image/jpeg;base64,";

  constructor(private compressImageService: CompressImageService) { }

  ngOnInit(): void {
  }

  /**
   * Ensure the preview image is removed once the form is reset.
   */
  ngOnChanges(): void {
    this.addSubscriptions();
    this.form.get('image')?.valueChanges.subscribe((val: string) => {
      if (!val) {
        this.deleteImage();
      }
    });
  }

  public processFile(input: any) {
    /**
     * Get the first file.
     */
    const file: File = input.files[0];
    console.info(`📂 ✅ UploadComponent, image size before compression: ${file.size} bytes.`);

    this.compressImageService.compress(file);
  }

  private addSubscriptions() {
    this.compressImageService.imageCompressed$
      .pipe(
        switchMap((file: File) => {
          console.info(`📂 ✅ UploadComponent, image size after compression: ${file?.size} bytes.`);
          return this.compressImageService.convertFileToBase64(file);
        }),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((stringRep: string) => {
        console.info("📂 ✅ UploadComponent, received base64 string: ", stringRep);
        this.selectedImageUrl$.next(`${this.base64Prefix}${stringRep}`);
      });
  }

  public deleteImage() {
    this.selectedImageUrl$.next(null);
    this.filePicker.nativeElement.value = '';
  }
}
