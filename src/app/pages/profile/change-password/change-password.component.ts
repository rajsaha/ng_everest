import { Component, OnInit } from "@angular/core";
import { ValidationService } from "@services/forms/validation.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "@services/user/user.service";
import { SnackbarService } from "@services/general/snackbar.service";
import { faKey } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  username: string;
  userId: string;
  showPasswordForm = false;

  passwordForm: FormGroup;

  // Icons
  faKey = faKey;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");

    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        currentPass: [""],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirm_password: [""],
        username: [this.username],
      },
      {
        validator: [
          this.validationService.matchingConfirmPasswords,
          this.validationService.checkPasswordStrength,
        ],
      }
    );
  }

  async changePasswordForm() {
    if (this.passwordForm.valid) {
      const response: any = await this.userService.updatePassword(
        this.passwordForm.value
      );

      if (!response.error) {
        this.snackbarService.openSnackBar({
          message: {
            message: "Password updated!",
            error: false,
          },
          class: "green-snackbar",
        });
      } else {
        this.snackbarService.openSnackBar({
          message: {
            message: `Error: ${response.error}!`,
            error: true,
          },
          class: "red-snackbar",
        });
      }
    }
  }
}
