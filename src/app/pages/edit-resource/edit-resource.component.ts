import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { faUpload, faPlusCircle, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ValidationService } from "@services/forms/validation.service";
import { delay } from "rxjs/operators";
import { ResourceService } from "@services/resource/resource.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { CollectionService } from "@services/collection/collection.service";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: "app-edit-resource",
  templateUrl: "./edit-resource.component.html",
  styleUrls: ["./edit-resource.component.scss"],
})
export class EditResourceComponent implements OnInit {
  resource: any;
  editResourceForm: FormGroup;
  selectedFile: any;
  @ViewChild("imageInput") imageInput: ElementRef;
  image: any;
  username: string;
  userId: string;
  collectionNames = [];
  submitButtonText = "Done";

  // Icons
  faUpload = faUpload;
  faPlusCircle = faPlusCircle;
  faGlobe = faGlobe;

  // Toggles
  isLoading = false;
  isDisabled = false;
  isUrlDisabled = true;
  isUrlChanged = false;
  isReady = false;

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

  // Store
  noImageComponentFormState$: Observable<boolean>;
  noImageData: any;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private resourceService: ResourceService,
    private collectionService: CollectionService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ noImageComponentFormState: any }>
  ) {}

  ngOnInit() {
    this.initEditResourceForm();
    this.onURLOnChanges();
    this.onNoImageChange();
    this.onIsCustomImageChange();
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");
    this.route.params.subscribe(async (params) => {
      await Promise.all([
        this.getResource({ resourceId: params.resourceId, userId: this.userId }),
        this.getCollectionNames(),
      ]);
    });
  }

  initEditResourceForm() {
    this.editResourceForm = this.fb.group(
      {
        id: [""],
        isCustomImage: [false],
        url: [{ disabled: this.isUrlDisabled }, Validators.required],
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
        ogImage: [""],
        customImage: [""],
        username: [this.username],
        type: ["ext-content"],
        collectionName: [""],
        timestamp: [""],
        noImage: [false]
      },
      { validator: [this.validationService.checkValidURL] }
    );
  }

  onNoImageChange() {
    this.editResourceForm.controls.noImage.valueChanges.subscribe((val) => {
      if (val) {
        this.editResourceForm.controls.isCustomImage.patchValue(false);
      }
    });
  }

  onIsCustomImageChange() {
    this.editResourceForm.controls.isCustomImage.valueChanges.subscribe(
      (val) => {
        if (val) {
          this.editResourceForm.controls.noImage.patchValue(false);
        }
      }
    );
  }

  get editResourceFormControls() {
    return this.editResourceForm.controls;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  async removeTag(tag) {
    const index = this.tags.indexOf(tag);
    const data = {
      id: this.resource._id,
      tag,
    };

    const res: any = await this.resourceService.removeTag(data);
    if (res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Something went wrong!",
          error: true,
        },
        class: "red-snackbar",
      });
    } else {
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
  }

  async submitEditResourceForm() {
    if (!this.editResourceForm.valid) {
      this.editResourceFormControls.title.markAsDirty();
      this.editResourceFormControls.description.markAsDirty();
      return;
    }

    this.submitButtonText = "Saving...";
    this.isLoading = true;
    this.isDisabled = true;
    this.monitorNoImageState();
    
    let data = {};
    data = {
      formData: this.editResourceForm.value,
      tags: this.tags,
      customImage: this.image,
      isUrlChanged: this.isUrlChanged,
      noImageData: this.noImageData,
    };

    const response: any = await this.resourceService.editResource(data);
    this.submitButtonText = "Done";
    this.isLoading = false;
    this.isDisabled = false;

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Resource saved!",
          error: false,
        },
        class: "green-snackbar",
      });
      this.router.navigate(
        [`/profile/user/${this.username}/resource/${this.resource._id}`],
        { relativeTo: this.route.parent }
      );
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${response.error}!`,
          error: true,
        },
        class: "red-snackbar",
      });
    }
    this.isDisabled = false;
  }

  async onURLOnChanges() {
    if (this.isUrlDisabled) {
      return;
    }
    this.editResourceForm.controls.url.valueChanges
      .pipe(delay(3000))
      .subscribe(async (val) => {
        this.isLoading = true;
        if (this.editResourceForm.controls.url.valid) {
          const response: any = await this.resourceService.getOpenGraphData({
            url: val,
          });

          this.isLoading = false;
          this.isUrlChanged = true;

          if (!response) {
            this.snackbarService.openSnackBar({
              message: {
                message: "No metadata returned!",
                error: false,
              },
              class: "red-snackbar",
            });
          } else {
            this.ogTitle = response.message.data.data.ogTitle;
            this.ogDescription = response.message.data.data.ogDescription;
            if (Array.isArray(response.message.data.data.ogImage)) {
              this.ogImage = response.message.data.data.ogImage[0].url;
            } else {
              this.ogImage = response.message.data.data.ogImage.url;
            }

            this.editResourceForm.controls.title.patchValue(this.ogTitle);
            this.editResourceForm.controls.description.patchValue(
              this.ogDescription
            );
            this.editResourceForm.controls.ogImage.patchValue(this.ogImage);
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

  onFileSelected(file: File) {
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.editResourceForm.controls.customImage.patchValue(reader.result);
      };
    }
  }

  async getCollectionNames() {
    const response: any = await this.collectionService.getCollectionTitles({
      username: this.username,
    });
    if (!response.error) {
      for (const item of response.data) {
        this.collectionNames.push(item.title);
      }
    }
  }

  async getResource(data: any) {
    try {
      this.isLoading = true;
      const response: any = await this.resourceService.getResource({ resourceId: data.resourceId, userId: data.userId });

      // * Redirect if resource belongs to someone else
      if (this.username !== response.resource.username[0]) {
        this.router.navigate(["/"]);
      }

      this.isLoading = false;
      this.resource = response.resource;
      this.setValues(this.resource);
    } catch (err) {
      console.error(err);
    }
  }

  setValues(data: any) {
    this.editResourceForm.controls.url.disable();
    this.editResourceForm.controls.id.patchValue(data._id);
    this.editResourceForm.controls.url.patchValue(data.url);
    this.editResourceForm.controls.title.patchValue(data.title);
    this.editResourceForm.controls.description.patchValue(data.description);
    this.editResourceForm.controls.ogImage.patchValue(data.lgImage.link);
    this.editResourceForm.controls.timestamp.patchValue(data.timestamp);
    this.tags = data.tags;
    this.ogImage = data.lgImage.link;

    if (data.noImage) {
      this.editResourceForm.controls.noImage.patchValue(true);
    }

    this.isReady = true;
  }

  monitorNoImageState() {
    this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.noImageData = data.noImageComponentState;
      });
  }
}
