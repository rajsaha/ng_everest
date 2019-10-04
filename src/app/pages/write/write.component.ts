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

  constructor(private fb: FormBuilder) {
    this.tinyMceInit = {
      apiKey: this.apiKey,
      selector: 'textarea',
      height: 470,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks fullscreen',
        'insertdatetime media table',
        'wordcount'
      ],
      toolbar:
        `undo redo | insert | styleselect |
        bold italic formatpainter permanentpen pageembed |
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | link image |
        advcode spellchecker a11ycheck | code | checklist | casechange`,
      toolbar_drawer: 'sliding',
      table_toolbar:
        `tableprops cellprops tabledelete |
        tableinsertrowbefore tableinsertrowafter tabledeleterow |
        tableinsertcolbefore tableinsertcolafter tabledeletecol`,
      powerpaste_allow_local_images: true,
      powerpaste_word_import: 'prompt',
      powerpaste_html_import: 'prompt',
      spellchecker_language: 'en',
      spellchecker_dialog: true
    };
  }

  ngOnInit() {
    this.initArticleForm();
  }

  initArticleForm() {
    this.articleForm = this.fb.group({
      body: ['', Validators.required],
      title: ['', Validators.required],
    });
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
    this.articleForm.get('body').patchValue(this.body);
    console.log(this.articleForm.value);
  }

  handleEvent(event: any) {
    this.body = event.event.content;
  }
}
