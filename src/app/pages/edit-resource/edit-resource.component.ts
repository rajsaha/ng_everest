import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faUpload, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ValidationService } from '@services/forms/validation.service';
import { delay } from 'rxjs/internal/operators';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { CollectionService } from '@services/collection/collection.service';
import { isArray } from 'util';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})

export class EditResourceComponent implements OnInit {
  resource: any;
  editResourceForm: FormGroup;
  selectedFile: any;
  @ViewChild('imageInput') imageInput: ElementRef;
  image: any;
  username: string;
  collectionNames = [];
  submitButtonText = 'Done';

  // Icons
  faUpload = faUpload;
  faPlusCircle = faPlusCircle;

  // Toggles
  isLoading = false;
  isDisabled = false;
  isUrlDisabled = true;

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.route.params.subscribe(async (params) => {
      await Promise.all([
        this.getResource(params.resourceId),
        this.getCollectionTitle(params.resourceId),
        this.initEditResourceForm(),
        this.onURLOnChanges(),
        this.getCollectionNames()]);
    });
  }

  initEditResourceForm() {
    this.editResourceForm = this.fb.group({
      id: [''],
      isCustomImage: [''],
      url: [{ disabled: this.isUrlDisabled }, Validators.required],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
      username: [this.username],
      type: ['ext-content'],
      collectionName: [''],
      timestamp: ['']
    }, { validator: [this.validationService.checkValidURL] });
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

  async removeTag(tag) {
    const index = this.tags.indexOf(tag);
    const data = {
      id: this.resource._id,
      tag
    };

    const res: any = await this.resourceService.removeTag(data);
    if (res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Something went wrong!',
          error: true
        },
        class: 'red-snackbar',
      });
    } else {
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
  }

  async submitEditResourceForm() {
    if (!this.editResourceForm.valid) {
      return;
    }

    this.submitButtonText = 'Saving...';
    this.isLoading = true;
    this.isDisabled = true;
    let data = {};
    if (this.editResourceForm.controls.isCustomImage) {
      data = {
        formData: this.editResourceForm.value,
        tags: this.tags,
        customImage: this.image
      };
    } else {
      data = {
        formData: this.editResourceForm.value,
        tags: this.tags
      };
    }

    const response: any = await this.resourceService.editResource(data);
    this.submitButtonText = 'Done';
    this.isLoading = false;
    this.isDisabled = false;

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Resource saved!',
          error: false
        },
        class: 'green-snackbar',
      });
      this.router.navigate([`/profile/user/${this.username}/resource/${this.resource._id}`], { relativeTo: this.route.parent });
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${response.error}!`,
          error: true
        },
        class: 'red-snackbar',
      });
    }
    this.isDisabled = false;
  }

  async onURLOnChanges() {
    if (this.isUrlDisabled) {
      return;
    }
    this.editResourceForm.controls.url.valueChanges.pipe(delay(3000)).subscribe(async (val) => {
      this.isLoading = true;
      if (this.editResourceForm.controls.url.valid) {
        const response: any = await this.resourceService.getOpenGraphData({
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
          if (isArray(response.message.data.data.ogImage)) {
            this.ogImage = response.message.data.data.ogImage[0].url;
          } else {
            this.ogImage = response.message.data.data.ogImage.url;
          }

          this.editResourceForm.controls.title.patchValue(this.ogTitle);
          this.editResourceForm.controls.description.patchValue(this.ogDescription);
          this.editResourceForm.controls.image.patchValue(this.ogImage);
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  onFocus() {
    this.isUrlDisabled = false;
    this.onURLOnChanges();
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

  async getCollectionNames() {
    const response: any = await this.collectionService.getCollectionNames({ username: this.username });
    if (response.collections) {
      for (const item of response.collections) {
        this.collectionNames.push(item.title);
      }
    }
  }

  async getResource(id: string) {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getResource({ id });

      // * Redirect if resource belongs to someone else
      if (this.username !== response.resource.username) {
        this.router.navigate(['/']);
      }

      this.isLoading = false;
      this.resource = response.resource;
      this.setValues(this.resource);
    } catch (err) {
      console.error(err);
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection: any = await this.collectionService.getCollectionTitleByResourceId({ username: this.username, resourceId });
    if (collection.collection) {
      this.editResourceForm.controls.collectionName.patchValue(collection.collection[0].title);
    }
  }

  setValues(data: any) {
    this.editResourceForm.controls.id.patchValue(data._id);
    this.editResourceForm.controls.url.patchValue(data.url);
    this.editResourceForm.controls.title.patchValue(data.title);
    this.editResourceForm.controls.description.patchValue(data.description);
    this.editResourceForm.controls.image.patchValue(data.lgImage.link);
    this.editResourceForm.controls.timestamp.patchValue(data.timestamp);
    this.tags = data.tags;
    this.ogImage = data.lgImage.link;
  }

}
