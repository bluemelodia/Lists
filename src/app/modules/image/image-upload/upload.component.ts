import { 
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
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
    console.log("===> input: ", input);
    const file: File = input.files[0];
    /**
     * Asynchronously read file contents on the user's computer.
     * Used to access additional file properties.
     */
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      /**
      * Base64 representation of the image.
      */
      this.selectedImage = {
        src: event.target.result,
        file: file
      }
    });

    /**
     * Get a base64 representation of the image in the callback
     * function of the listener above.
     */
    reader.readAsDataURL(file);
  }

  public deleteImage() {
    this.selectedImage = null;
    this.filePicker.nativeElement.value = '';
  }
}
