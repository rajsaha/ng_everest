import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ValidationService } from '@services/forms/validation.service';
import { HttpClient } from '@angular/common/http';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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
  articleForm: FormGroup;
  body: any;
  saveButtonText = 'Save';
  selectedFile: any;
  image = '';
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;

  // Tags
  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Icons
  faUpload = faUpload;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private http: HttpClient) {}

  ngOnInit() {
    this.initArticleForm();
    this.initTinyMceEditor();
    this.onURLOnChanges();
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      isCustomImage: [''],
      url: ['']
    }, { validators: this.validationService.checkValidImageUrl });
  }

  initTinyMceEditor() {
    this.tinyMceInit = {
      selector: 'textarea',
      height: 470,
      menubar: true,
      plugins: [
        'lists link image print preview anchor',
        'table',
        'wordcount'
      ],
      toolbar: `undo redo | styleselect |
        bold italic |
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | link image`,
      toolbar_drawer: 'sliding',
      table_toolbar: `tableprops cellprops tabledelete |
        tableinsertrowbefore tableinsertrowafter tabledeleterow |
        tableinsertcolbefore tableinsertcolafter tabledeletecol`
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

  submitArticle() {
    if (this.articleForm.valid) {
      const payload = {
        form: this.articleForm.value,
        tags: this.tags
      };
      console.log(payload);
    }
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

  onURLOnChanges() {
    this.articleForm.controls.url.valueChanges.subscribe((val) => {
      if (this.articleForm.controls.url.valid) {
        this.image = val;
      }
    });
  }
}
