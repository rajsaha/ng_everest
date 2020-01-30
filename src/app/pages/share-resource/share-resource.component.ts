import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faUpload, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ValidationService } from '@services/forms/validation.service';
import { debounceTime } from 'rxjs/internal/operators';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { CollectionService } from '@services/collection/collection.service';
import { isArray } from 'util';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
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
  username: string;
  collections: Array<object> = [];
  submitButtonText = 'Share';
  atcData: any;

  // Icons
  faUpload = faUpload;
  faPlusCircle = faPlusCircle;

  // Toggles
  isLoading = false;
  isDisabled = false;

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
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initShareResourceForm();
    this.onURLOnChanges();
  }

  initShareResourceForm() {
    this.shareResourceForm = this.fb.group(
      {
        isCustomImage: [''],
        url: ['', Validators.required],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        image: [''],
        username: [this.username],
        type: ['ext-content']
      },
      { validator: [this.validationService.checkValidURL] }
    );
  }

  get shareResourceFormControls() {
    return this.shareResourceForm.controls;
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

  async submitShareResourceForm() {
    if (!this.shareResourceForm.valid) {
      return;
    }

    if (this.shareResourceForm.controls.isCustomImage) {
      this.isLoading = true;
      this.isDisabled = true;
      this.submitButtonText = 'Sharing...';

      const data = {
        formData: this.shareResourceForm.value,
        tags: this.tags,
        collectionData: this.atcData,
        customImage: this.image
      };

      const response: any = await this.resourceService.shareResource(data);
      this.isLoading = false;
      this.isDisabled = false;
      this.submitButtonText = 'Sharing';

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: 'Resource saved!',
            error: false
          },
          class: 'green-snackbar'
        });
        this.router.navigate(['/']);
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true
          },
          class: 'red-snackbar'
        });
        this.isDisabled = false;
      }
    } else {
      this.isLoading = true;
      this.isDisabled = true;
      this.submitButtonText = 'Sharing...';

      const data = {
        formData: this.shareResourceForm.value,
        tags: this.tags,
        collectionData: this.atcData
      };

      const response: any = await this.resourceService.shareResource(data);
      this.isLoading = false;
      this.isDisabled = false;
      this.submitButtonText = 'Sharing';

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: 'Resource saved!',
            error: false
          },
          class: 'green-snackbar'
        });
        this.router.navigate(['/']);
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true
          },
          class: 'red-snackbar'
        });
        this.isDisabled = false;
      }
    }
  }

  async onURLOnChanges() {
    this.shareResourceForm.controls.url.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(async val => {
        this.isLoading = true;
        this.shareResourceForm.get('title').disable;
        this.shareResourceForm.get('description').disable;

        if (this.shareResourceForm.controls.url.valid) {
          const response: any = await this.resourceService.getOpenGraphData({
            url: val
          });

          this.isLoading = false;
          this.shareResourceForm.get('title').enable;
          this.shareResourceForm.get('description').enable;

          if (!response) {
            this.snackbarService.openSnackBar({
              message: {
                message: 'No metadata returned!',
                error: false
              },
              class: 'red-snackbar'
            });
          } else {
            this.ogTitle = response.message.data.data.ogTitle;
            this.ogDescription = response.message.data.data.ogDescription;
            if (
              isArray(response.message.data.data.ogImage) &&
              response.message.data.data.ogImage.length > 0
            ) {
              this.ogImage = response.message.data.data.ogImage[0].url;
            } else {
              this.ogImage = response.message.data.data.ogImage.url;
            }

            this.shareResourceForm.controls.title.patchValue(this.ogTitle);
            this.shareResourceForm.controls.description.patchValue(
              this.ogDescription
            );
            this.shareResourceForm.controls.image.patchValue(this.ogImage);

            if (!this.ogImage) {
              this.snackbarService.openSnackBar({
                message: {
                  message: 'This resource has no image',
                  error: false
                },
                class: 'red-snackbar'
              });
            }
          }
        } else {
          this.isLoading = false;
          this.shareResourceForm.get('title').enable;
          this.shareResourceForm.get('description').enable;
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

  receiveAtcData($event) {
    this.atcData = $event;
  }
}
