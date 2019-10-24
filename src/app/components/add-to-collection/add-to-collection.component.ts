import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss']
})
export class AddToCollectionComponent implements OnInit {
  @Input() resourceId: string;
  @Output() message = new EventEmitter<object>();

  username: string;
  collections = [];
  currentCollectionName = '';

  // Pagination
  pageNo = 1;
  size = 5;

  // Form
  atcForm: FormGroup;

  constructor(
    private collectionService: CollectionService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initAtcForm();
    this.onFormChanges();
    await this.getCollectionNames();
    if (this.resourceId) {
      await this.getCollectionTitle(this.resourceId);
    }
  }

  initAtcForm() {
    this.atcForm = this.fb.group({
      collectionId: [''],
      newCollection: [false],
      collectionName: ['']
    });
  }

  get atcFormControls() {
    return this.atcForm.controls;
  }

  async getCollectionNames() {
    const response = await this.collectionService.getCollectionNames({
      pageNo: this.pageNo,
      size: this.size,
      username: this.username
    });

    if (response.collections) {
      for (const collection of response.collections) {
        this.collections.push(collection);
      }
    }
  }

  async getCollectionTitle(resourceId: string) {
    const collection = await this.collectionService.getCollectionTitleByResourceId(
      { username: this.username, resourceId }
    );

    if (collection.collection) {
      this.currentCollectionName = collection.collection.title;
    }
  }

  onFormChanges() {
    this.atcForm.valueChanges.subscribe(() => {
      this.message.emit(this.atcForm.value);
    });
  }
}
