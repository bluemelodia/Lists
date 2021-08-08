import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() onImageUpload = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public processFile(input: any) {
    /**
     * Get the first file.
     */
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
      this.onImageUpload.emit(event.target.result);
    });

    /**
     * Get a base64 representation of the image in the callback
     * function of the listener above.
     */
    reader.readAsDataURL(file);
  }
}
