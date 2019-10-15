import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from '@services/forms/validation.service';
import { environment as ENV } from '@environments/environment';
import { CollectionService } from '@services/collection/collection.service';
import { faUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ResourceService } from '@services/resource/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@services/general/snackbar.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  apiKey = `${ENV.TINYMCE_API_KEY}`;
  tinyMceInit: any;
  editArticleForm: FormGroup;
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;
  selectedFile: any;
  isLoading = false;
  isDisabled = false;
  saveButtonText = 'Save';

  // Data
  resourceId: string;
  resource: any;
  username: string;
  image = '';
  customImage = '';
  collections = [];

  // Tags
  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Icons
  faUpload = faUpload;
  faTrashAlt = faTrashAlt;

  constructor(
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private validationService: ValidationService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initTinyMceEditor();
    this.getCollectionNames();
    this.getResourceId();
    this.initArticleForm();
    this.onURLOnChanges();
  }

  getResourceId() {
    this.route.params.subscribe(async params => {
      this.resourceId = params.resourceId;
      await this.getResource(this.resourceId);
      await this.getCollectionTitle(this.resourceId);
      this.patchArticleForm(this.resource);
    });
  }

  initArticleForm() {
    this.editArticleForm = this.fb.group(
      {
        id: this.resourceId,
        isCustomImage: [false],
        image: [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
        username: [this.username],
        type: ['article'],
        collectionId: [''],
        collectionName: ['']
      },
      { validators: this.validationService.checkValidImageUrl }
    );
  }

  initTinyMceEditor() {
    this.tinyMceInit = {
      selector: '#tinyeditor',
      height: 600,
      plugins: ['lists link image print preview anchor', 'table', 'wordcount'],
      toolbar: `undo redo | styleselect |
        bold italic | alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | link image`
    };
  }

  get editArticleFormControls() {
    return this.editArticleForm.controls;
  }

  onURLOnChanges() {
    this.editArticleFormControls.image.valueChanges.subscribe(val => {
      if (this.editArticleFormControls.image.valid) {
        this.image = val;
      }
    });
  }

  removeImage(whichImage: string) {
    if (whichImage === 'image') {
      this.image = '';
      this.editArticleFormControls.image.patchValue('');
    } else {
      this.customImage = '';
    }
  }

  async getCollectionNames() {
    const response = await this.collectionService.getCollectionNames({
      username: this.username
    });
    if (response.collections) {
      for (const item of response.collections) {
        this.collections.push({
          title: item.title,
          id: item._id
        });
      }
    }
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

  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.customImage = event.target.result;
    });

    reader.readAsDataURL(file);
  }

  async getResource(id: string) {
    try {
      this.isLoading = true;
      const response = await this.resourceService.getResource({ id });
      this.isLoading = false;
      this.resource = response.resource;
    } catch (err) {
      console.error(err);
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection) {
      this.editArticleFormControls.collectionName.patchValue(
        collection.collection.title
      );
    }
  }

  patchArticleForm(data: any) {
    this.editArticleFormControls.title.patchValue(data.title);
    this.editArticleFormControls.description.patchValue(data.description);
    this.editArticleFormControls.image.patchValue(data.image);
    this.tags = data.tags;
  }

  async submitEditArticleForm() {
    if (!this.editArticleForm.valid) {
      return;
    }

    this.saveButtonText = 'Saving...';
    this.isLoading = true;
    this.isDisabled = true;
    let data = {};
    if (this.editArticleFormControls.isCustomImage) {
      data = {
        formData: this.editArticleForm.value,
        tags: this.tags,
        customImage: this.customImage
      };
    } else {
      data = {
        formData: this.editArticleForm.value,
        tags: this.tags
      };
    }

    const response = await this.resourceService.editResource(data);
    this.saveButtonText = 'Done';
    this.isLoading = false;
    this.isDisabled = false;

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: 'Resource saved!',
          error: false
        },
        class: 'green-snackbar'
      });
      this.router.navigate(
        [`/profile/user/${this.username}/resource/${this.resource._id}`],
        { relativeTo: this.route.parent }
      );
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${response.error}!`,
          error: true
        },
        class: 'red-snackbar'
      });
    }
    this.isDisabled = false;
  }
}
