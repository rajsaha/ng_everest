import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { SnackbarService } from '@services/general/snackbar.service';
import { ResourceService } from '@services/resource/resource.service';
import { UserService } from '@services/user/user.service';
import { debounceTime } from 'rxjs/operators';
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.scss']
})
export class UserInterestsComponent implements OnInit {
  @Input() userId: string;
  @Input() postCount: number;
  @Output() refresh = new EventEmitter<boolean>();
  interests = [];
  interestsBackup = [];
  options = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  headerText: string;

  // Toggles
  isLoading = false;
  isDisabled = false;
  submitButtonText = "Save";
  showEditInterests = false;
  isAddMore = false;

  // Icons
  faPlus = faPlus;
  faTimes = faTimes;

  form: FormGroup;

  constructor(private snackbarService: SnackbarService, private userService: UserService, private resourceService: ResourceService, private fb: FormBuilder) { }


  async ngOnInit() {
    await this.getUserInterests();
    this.setHeader();
    this.initForm();
    this.onFormChange();
  }

  initForm() {
    this.form = this.fb.group({
      interests: ["", Validators.required]
    });
  }

  onFormChange() {
    this.form.controls.interests.valueChanges.pipe(debounceTime(500)).subscribe(async (val) => {
      if (val.length >= 3) {
        const result: any = await this.resourceService.searchTags({ query: val });

        if (!result.error) {
          this.options = result.resources;
        }
      }
    });
  }

  selectInterest($event: MatAutocompleteSelectedEvent) {
    this.interests.push($event.option.value);
    this.form.controls.interests.patchValue("");
  }

  setHeader() {
    if (this.interests.length === 0) {
      this.headerText = "It looks like you haven't set any interests yet! Please add in a few."
      this.showEditInterests = true;
    }

    if (this.interests.length > 0 && this.postCount === 0) {
      this.headerText = "We couldn't find any posts with the given interests. Try adding more!";
      this.showEditInterests = true;
    }
  }

  addInterest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.interests.push(value.toLocaleLowerCase());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  async removeInterest(interest) {
    const index = this.interests.indexOf(interest);
    const data = {
      id: this.userId,
      interest
    };

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  async getUserInterests() {
    const result: any = await this.userService.getUserInterests({ userId: this.userId });
    this.interests = result.user.interests;
    this.interestsBackup = JSON.parse(JSON.stringify(result.user.interests));
  }

  async save() {
    if (this.interests.length === 0) {
      return;
    }

    const data = {
      id: this.userId,
      interests: this.interests,
    };

    this.isLoading = true;
    this.isDisabled = true;
    this.submitButtonText = "Saving...";

    const res: any = await this.userService.setUserInterests(data);

    this.isLoading = false;
    this.isDisabled = false;
    this.submitButtonText = "Save";
    this.refreshExplorePage();

    if (!res.error) {
      this.snackbarService.openSnackBar({
        message: {
          message: "Profile data saved!",
          error: false
        },
        class: "green-snackbar"
      });
    } else {
      this.snackbarService.openSnackBar({
        message: {
          message: `Error: ${res.error}!`,
          error: true
        },
        class: "red-snackbar"
      });
    }
  }

  addMore() {
    this.isAddMore = true;
  }

  cancel() {
    this.interests = this.interestsBackup;
    this.isAddMore = false;
  }

  refreshExplorePage() {
    this.refresh.emit(true);
  }

}
