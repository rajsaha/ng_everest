import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ValidationService } from '@services/forms/validation.service';
import { delay } from 'rxjs/internal/operators';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-share-resource',
  templateUrl: './share-resource.component.html',
  styleUrls: ['./share-resource.component.scss']
})
export class ShareResourceComponent implements OnInit {
  shareResourceForm: FormGroup;
  selectedFile: any;
  @ViewChild('imageInput') imageInput: ElementRef;
  image: any;

  // Icons
  faUpload = faUpload;

  // Toggles
  isLoading = false;

  // Tags
  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Open graph variables
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  constructor(
    private fb: FormBuilder, 
    private validationService: ValidationService,
    private resourceService: ResourceService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.initShareResourceForm();
    this.onURLOnChanges();
  }

  initShareResourceForm() {
    this.shareResourceForm = this.fb.group({
      isCustomImage: [''],
      url: ['', Validators.required],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    }, { validator: [this.validationService.checkValidURL]});
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  submitShareResourceForm() {
    if (this.shareResourceForm.valid) {
      console.log(this.shareResourceForm.value);
    }
  }

  async onURLOnChanges() {
    this.shareResourceForm.controls.url.valueChanges.pipe(delay(3000)).subscribe(async (val) => {
      this.isLoading = true;
      if (this.shareResourceForm.controls.url.valid) {
        const response = await this.resourceService.getOpenGraphData({
          url: val
        });
  
        this.isLoading = false;
  
        if (!response) {
          this.snackbarService.openSnackBar({
            message: {
              message: 'No metadata returned!',
              error: false
            },
            class: 'red-snackbar',
          });
        } else {
          this.ogTitle = response.message.data.data.ogTitle;
          this.ogDescription = response.message.data.data.ogDescription;
          this.ogImage = response.message.data.data.ogImage.url;
  
          this.shareResourceForm.controls.title.patchValue(this.ogTitle);
          this.shareResourceForm.controls.description.patchValue(this.ogDescription);
          this.shareResourceForm.controls.image.patchValue(this.ogImage);
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.image = event.target.result;
    });

    reader.readAsDataURL(file);
  }

}
