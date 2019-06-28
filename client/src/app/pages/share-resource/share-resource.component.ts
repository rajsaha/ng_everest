import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-share-resource',
  templateUrl: './share-resource.component.html',
  styleUrls: ['./share-resource.component.scss']
})
export class ShareResourceComponent implements OnInit {
  shareResourceForm: FormGroup;

  // Icons
  faUpload = faUpload;

  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initShareResourceForm();
  }

  initShareResourceForm() {
    this.shareResourceForm = this.fb.group({
      isCustomImage: [''],
      url: [''],
      title: [''],
      description: ['']
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

  submitShareResourceForm() {
    if (this.shareResourceForm.valid) {
      console.log(this.shareResourceForm.value);
    }
  }

}
