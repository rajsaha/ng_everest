import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { faUpload, faPlusCircle, faImage } from "@fortawesome/free-solid-svg-icons";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ValidationService } from "@services/forms/validation.service";
import { ResourceService } from "@services/resource/resource.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { debounceTime } from "rxjs/operators";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: "app-share-resource",
  templateUrl: "./share-resource.component.html",
  styleUrls: ["./share-resource.component.scss"],
})
export class ShareResourceComponent implements OnInit {
  shareResourceForm: FormGroup;
  selectedFile: any;
  @ViewChild("imageInput") imageInput: ElementRef;
  username: string;
  userId: string;
  collections: Array<object> = [];
  submitButtonText = "Share";
  atcData: any;

  // Icons
  faUpload = faUpload;
  faPlusCircle = faPlusCircle;
  faImage = faImage;

  // Toggles
  isLoading = false;
  isDisabled = false;

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
    private snackbarService: SnackbarService,
    private router: Router,
    private store: Store<{ noImageComponentFormState: any }>,
    private readonly meta: MetaService
  ) {
    this.noImageComponentFormState$ = store.pipe(
      select("noImageComponentFormState")
    );
  }

  ngOnInit() {
    // * Set meta tags
    this.meta.setTitle("Share Resource");
    this.meta.setTag('og:description', "Share a resource");
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");
    this.initShareResourceForm();
    this.onURLOnChanges();
    this.onNoImageChange();
    this.onIsCustomImageChange();
  }

  initShareResourceForm() {
    this.shareResourceForm = this.fb.group(
      {
        isCustomImage: [false],
        noImage: [false],
        url: ["", Validators.required],
        title: ["", [Validators.required, Validators.maxLength(250)]],
        description: ["", [Validators.required]],
        ogImage: [""],
        customImage: [""],
        userId: [this.userId],
        type: ["ext-content"],
        username: [this.username],
      },
      { validator: [this.validationService.checkValidURL] }
    );
  }

  get shareResourceFormControls() {
    return this.shareResourceForm.controls;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push(value.toLocaleLowerCase());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  async submitShareResourceForm() {
    if (!this.shareResourceForm.valid) {
      this.shareResourceFormControls.url.markAsDirty();
      this.shareResourceFormControls.title.markAsDirty();
      this.shareResourceFormControls.description.markAsDirty();
      return;
    }

    this.isLoading = true;
    this.isDisabled = true;
    this.submitButtonText = "Sharing...";
    this.monitorNoImageState();

    const data = {
      formData: this.shareResourceForm.value,
      tags: this.tags,
      collectionData: this.atcData,
      noImageData: this.noImageData,
    };

    const response: any = await this.resourceService.shareResource(data);
    this.isLoading = false;
    this.isDisabled = false;
    this.submitButtonText = "Sharing";

    if (!response.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Resource saved!",
          error: false,
        },
        class: "green-snackbar",
      });
      this.router.navigate(["/"]);
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${response.error}!`,
          error: true,
        },
        class: "red-snackbar",
      });
      this.isDisabled = false;
    }
  }

  onNoImageChange() {
    this.shareResourceForm.controls.noImage.valueChanges.subscribe((val) => {
      if (val) {
        this.shareResourceForm.controls.isCustomImage.patchValue(false);
      }
    });
  }

  onIsCustomImageChange() {
    this.shareResourceForm.controls.isCustomImage.valueChanges.subscribe(
      (val) => {
        if (val) {
          this.shareResourceForm.controls.noImage.patchValue(false);
        }
      }
    );
  }

  async onURLOnChanges() {
    this.shareResourceForm.controls.url.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(async (val) => {
        this.isLoading = true;
        this.shareResourceForm.get("title").disable;
        this.shareResourceForm.get("description").disable;

        if (this.shareResourceForm.controls.url.valid) {
          const response: any = await this.resourceService.getOpenGraphData({
            url: val,
          });

          this.isLoading = false;
          this.shareResourceForm.get("title").enable;
          this.shareResourceForm.get("description").enable;

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
            if (
              Array.isArray(response.message.data.data.ogImage) &&
              response.message.data.data.ogImage.length > 0
            ) {
              this.ogImage = response.message.data.data.ogImage[0].url;
            } else {
              this.ogImage = response.message.data.data.ogImage.url;
            }

            this.shareResourceForm.controls.title.patchValue(this.ogTitle);
            this.shareResourceForm.controls.description.patchValue(
              this.ogDescription
            );
            this.shareResourceForm.controls.ogImage.patchValue(this.regexTestOgImage(this.ogImage));

            if (!this.ogImage) {
              this.snackbarService.openSnackBar({
                message: {
                  message: "This resource has no image",
                  error: false,
                },
                class: "red-snackbar",
              });
            }
          }
        } else {
          this.isLoading = false;
          this.shareResourceForm.get("title").enable;
          this.shareResourceForm.get("description").enable;
        }
      });
  }

  onFileSelected(file: File) {
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.shareResourceForm.controls.customImage.patchValue(reader.result);
      };
    }
  }

  receiveAtcData($event) {
    this.atcData = $event;
  }

  monitorNoImageState() {
    this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.noImageData = data.noImageComponentState;
      });
  }

  regexTestOgImage(url: string) {
    let regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|webm)/);
    let result = regex.test(url);
    if (result) {
      this.shareResourceForm.controls.noImage.patchValue(false);   
      return url;
    }

    this.shareResourceForm.controls.noImage.patchValue(true);
    return 'none';
  }
}
