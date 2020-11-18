import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CollectionService } from '@services/collection/collection.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss']
})
export class AddToCollectionComponent implements OnInit {
  @Input() resourceId: string;
  @Output() message = new EventEmitter<object>();
  @ViewChild('collectionSelect') selectCollection: MatSelect;

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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem('username');
    this.initAtcForm();
    this.onFormChanges();
    await this.getCollectionTitles();
    if (this.resourceId) {
      await this.getCollectionTitle(this.resourceId);
    }
    this.getQueryParams();
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

  async getCollectionTitles() {
    const response: any = await this.collectionService.getCollectionTitles({
      pageNo: this.pageNo,
      size: this.size,
      username: this.username
    });

    if (!response.error) {
      for (const collection of response.data) {
        this.collections.push(collection);
      }
    }
  }

  async getCollectionTitle(resourceId: string) {

    const collection: any = await this.collectionService.getCollectionTitleByResourceId(
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

  registerScrollEvent() {
    console.log('scrolling');
    const selectPanel = this.selectCollection.panel.nativeElement;
    selectPanel.addEventListener('scroll', async () => {
      this.pageNo++;
      await this.getCollectionTitles();
    });
  }

  getQueryParams() {
    this.route.queryParams.subscribe((val) => {
      if (val.collectionId) {
        this.atcForm.controls.collectionId.patchValue(val.collectionId);
      }
    });
  }
}
