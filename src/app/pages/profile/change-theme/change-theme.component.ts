import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  faEye,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { ColorSchemeService } from "@services/color-scheme/color-scheme.service";
import { CustomColorSchemeService } from '@services/custom-color-scheme/custom-color-scheme.service';

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
    private customColorSchemeService: CustomColorSchemeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCurrentTheme();
    this.onFormChange();
  }

  initForm() {
    this.form = this.fb.group({
      theme: ["light"],
    });
  }

  getCurrentTheme() {
    this.form.controls.theme.patchValue(this.customColorSchemeService.getCurrentTheme());
  }

  onFormChange() {
    this.form.controls.theme.valueChanges.subscribe((val) => {
      switch (val) {
        case "light":
          this.customColorSchemeService.setLightTheme();
          break;
        case "dark":
          this.customColorSchemeService.setDarkTheme();
          break;
        default:
          break;  
      }
    });
  }
}
