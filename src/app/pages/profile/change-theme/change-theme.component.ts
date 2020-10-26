import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  faEye,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { ColorSchemeService } from "@services/color-scheme/color-scheme.service";

@Component({
  selector: "app-change-theme",
  templateUrl: "./change-theme.component.html",
  styleUrls: ["./change-theme.component.scss"],
})
export class ChangeThemeComponent implements OnInit {
  showChangeThemeForm = false;

  // Icons
  faEye = faEye;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private colorSchemeService: ColorSchemeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.onFormChange();
  }

  initForm() {
    this.form = this.fb.group({
      theme: ["light"],
    });
  }

  onFormChange() {
    this.form.controls.theme.valueChanges.subscribe((val) => {
      this.colorSchemeService.update(val);
    });
  }
}
