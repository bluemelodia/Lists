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
import { take, takeUntil } from 'rxjs/operators';

import { CompressImageService } from '../../../services/image-compress.service';
import { ImageSnippet } from '../../../types/image.types';

@Component({
  selector: 'app-img-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;

  @ViewChild('imageInput') filePicker: ElementRef;

  selectedImage: ImageSnippet;
  private ngUnsubscribe$ = new Subject<void>();

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
    console.log(`Image size before compressed: ${file.size} bytes.`);

    this.compressImageService.compress(file);
  }

  private addSubscriptions() {
    this.compressImageService.imageCompressed$
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((file: File) => {
          console.log("===> got compressed file: ", file);
      });
  }

  public deleteImage() {
    this.selectedImage = null;
    this.filePicker.nativeElement.value = '';
  }
}
