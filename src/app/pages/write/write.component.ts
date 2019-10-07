import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

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

  // Tags
  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initArticleForm();
    this.initTinyMceEditor();
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      body: ['', Validators.required],
      title: ['', Validators.required]
    });
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
        title: this.articleFormControls.title.value,
        body: this.articleFormControls.body.value,
        tags: this.tags
      };
      console.log(payload);
    }
  }
}
