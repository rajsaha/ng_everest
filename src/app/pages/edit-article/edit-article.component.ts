import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from '@services/forms/validation.service';
import { environment as ENV } from '@environments/environment';
import { CollectionService } from '@services/collection/collection.service';
import { faUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ResourceService } from '@services/resource/resource.service';
import { ActivatedRoute } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  apiKey = `${ENV.TINYMCE_API_KEY}`;
  tinyMceInit: any;
  articleForm: FormGroup;
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;
  selectedFile: any;
  isLoading = false;
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
    private fb: FormBuilder,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initTinyMceEditor();
    this.initArticleForm();
    this.getCollectionNames();
    this.onURLOnChanges();
    this.getResourceId();
  }

  getResourceId() {
    this.router.params.subscribe(async (params) => {
      this.resourceId = params.resourceId;
      await this.getResource(this.resourceId);
      await this.getCollectionTitle(this.resourceId);
      this.patchArticleForm(this.resource);
    });
  }

  initArticleForm() {
    this.articleForm = this.fb.group(
      {
        isCustomImage: [''],
        imageLink: [''],
        title: ['', Validators.required],
        body: ['', Validators.required],
        username: [this.username],
        type: ['article'],
        collectionId: [''],
        collectionTitle: ['']
      },
      { validators: this.validationService.checkValidImageUrl }
    );
  }

  initTinyMceEditor() {
    this.tinyMceInit = {
      selector: '#tinyeditor',
      height: 600,
      plugins: [
        'lists link image print preview anchor',
        'table',
        'wordcount'
      ],
      toolbar: `undo redo | styleselect |
        bold italic | alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | link image`
    };
  }

  get articleFormControls() {
    return this.articleForm.controls;
  }

  onURLOnChanges() {
    this.articleForm.controls.imageLink.valueChanges.subscribe((val) => {
      if (this.articleForm.controls.imageLink.valid) {
        this.image = val;
      }
    });
  }

  removeImage(whichImage: string) {
    if (whichImage === 'image') {
      this.image = '';
      this.articleFormControls.imageLink.patchValue('');
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
      const response = await this.resourceService.getResource({id});
      this.isLoading = false;
      this.resource = response.resource;
      console.log(this.resource);
    } catch (err) {
      console.error(err);
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId({ username: this.username, resourceId });

    if (collection.collection) {
      this.articleFormControls.collectionTitle.patchValue(collection.collection.title);
    }
  }

  patchArticleForm(data: any) {
    this.articleFormControls.title.patchValue(data.title);
    this.articleFormControls.body.patchValue(data.description);
    this.articleFormControls.imageLink.patchValue(data.image);
    this.tags = data.tags;
  }
}
