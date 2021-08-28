import { 
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of, ReplaySubject, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

import { CompressImageService } from '../../../services/image-compress.service';
import { DialogService } from '../../../services/dialog.service';
import { Dialog } from '../../../types/dialog/dialog.types';

@Component({
	selector: 'app-img-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnChanges, OnDestroy {
  @Input() set form(form: FormGroup) {
		this.uploadForm = form;
		this.patchImage();
	}
  public uploadForm: FormGroup;

  @ViewChild('imageInput') filePicker: ElementRef;

  public selectedImageUrl$ = new ReplaySubject<string>();
  private ngUnsubscribe$ = new Subject<void>();

  private readonly base64Prefix = "data:image/jpeg;base64,";

  constructor(
    private compressImageService: CompressImageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Ensure the preview image is removed once the form is reset.
   */
  ngOnChanges(): void {
  	this.addSubscriptions();
  	this.uploadForm.get('image')?.valueChanges.subscribe((val: string) => {
  		if (!val) {
  			console.info("📂 🗑 UploadComponent ---> ngOnChanges, image form field changed, clear the image");
  			this.clearImage();
  		}
  	});
  }

  public processFile(input: any) {
  	/**
     * Get the first file.
     */
  	const file: File = input.files[0];
  	// console.info(`📂 ✅ UploadComponent ---> processFile, image size before compression: ${file.size} bytes.`);

  	this.compressImageService.compress(file);
  }

  /**
   * If the user manually deletes the image, then it's because they don't want it submitted. 
   * If the form clears the image, then it's because the form needs to cleared.
   */
  public deleteImage() {
  	this.uploadForm.patchValue({
  		image: null
  	});
  	this.clearImage();
  }

  public clearImage() {
  	this.selectedImageUrl$.next(null);
  	this.filePicker.nativeElement.value = '';
  }

  private addSubscriptions() {
  	this.compressImageService.imageCompressed$
  		.pipe(
  			switchMap((file: File) => {
  				// console.info(`📂 ✅ UploadComponent ---> addSubscriptions, image size after compression: ${file?.size} bytes.`);
  				return this.compressImageService.convertFileToBase64(file);
  			}),
  			catchError((err) => {
  				this.dialogService.showErrorDialog(Dialog.UploadFailed);
  				return of(null);
  			}),
  			takeUntil(this.ngUnsubscribe$),
  		)
  		.subscribe((stringRep: string) => {
  			// console.info(`📂 ✅ UploadComponent ---> addSubscriptions, successfully converted to base64.`);
  			this.selectedImageUrl$.next(`${this.base64Prefix}${stringRep}`);
  			this.uploadForm.patchValue({
  				image: stringRep
  			});
  		});
  }

  private patchImage() {
  	const uploadedImage = this.uploadForm?.get("image")?.value;
  	if (uploadedImage) {
  		// console.info(`📂 💾 UploadComponent --> patchImage, patch user-uploaded image: ${uploadedImage}.`);
  		this.selectedImageUrl$.next(`${this.base64Prefix}${this.uploadForm.get("image").value}`);
  	}
  }

  ngOnDestroy(): void {
  	this.ngUnsubscribe$.next();
  	this.ngUnsubscribe$.complete();
  }
}
