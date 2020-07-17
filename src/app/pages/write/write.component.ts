import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ValidationService } from '@services/forms/validation.service';
import { faUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from '@services/resource/resource.service';
import { SnackbarService } from '@services/general/snackbar.service';
import { Router } from '@angular/router';
import { CollectionService } from '@services/collection/collection.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  apiKey = `${ENV.TINYMCE_API_KEY}`;
  tinyMceInit: any;
  saveButtonText = 'Save';
  selectedFile: any;
  @ViewChild('imageInput') imageInput: ElementRef;
  isLoading = false;
  isDisabled = false;
  collections = [];

  // Article Form
  username: string;
  articleForm: FormGroup;
  image = '';
  customImage = '';

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
    private fb: FormBuilder,
    private validationService: ValidationService,
    private resourceService: ResourceService,
    private snackbarService: SnackbarService,
    private collectionService: CollectionService,
    private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initArticleForm();
    this.initTinyMceEditor();
    this.onURLOnChanges();
    this.getCollectionNames();
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      isCustomImage: [''],
      image: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      username: [this.username],
      type: ['article'],
      collectionId: [''],
      collectionTitle: ['']
    }, { validators: this.validationService.checkValidImageUrl });
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

  onURLOnChanges() {
    this.articleForm.controls.image.valueChanges.subscribe((val) => {
      if (this.articleForm.controls.image.valid) {
        this.image = val;
      }
    });
  }

  removeImage(whichImage: string) {
    if (whichImage === 'image') {
      this.image = '';
      this.articleFormControls.image.patchValue('');
    } else {
      this.customImage = '';
    }
  }

  async submitArticle() {
    if (!this.articleForm.valid) {
      return;
    }

    if (this.articleForm.controls.isCustomImage) {
      this.isLoading = true;
      this.isDisabled = true;
      this.saveButtonText = 'Saving...';

      const data = {
        formData: this.articleForm.value,
        tags: this.tags,
        customImage: this.customImage
      };

      const response: any = await this.resourceService.shareResource(data);
      this.isLoading = false;
      this.isDisabled = false;
      this.saveButtonText = 'Save';

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: 'Resource saved!',
            error: false
          },
          class: 'green-snackbar',
        });
        this.router.navigate(['/']);
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true
          },
          class: 'red-snackbar',
        });
        this.isDisabled = false;
      }
    } else {
      this.isLoading = true;
      this.isDisabled = true;
      this.saveButtonText = 'Sharing...';

      const data = {
        formData: this.articleForm.value,
        tags: this.tags,
      };

      const response: any = await this.resourceService.shareResource(data);
      this.isLoading = false;
      this.isDisabled = false;
      this.saveButtonText = 'Sharing';

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: 'Resource saved!',
            error: false
          },
          class: 'green-snackbar',
        });
        this.router.navigate(['/']);
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true
          },
          class: 'red-snackbar',
        });
        this.isDisabled = false;
      }
    }
  }

  async getCollectionNames() {
    const response: any = await this.collectionService.getCollectionNames({
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
}
