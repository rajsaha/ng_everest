import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  matchingConfirmPasswords(passwordKey: any) {
    const passwordInput = passwordKey.value;
    if (passwordInput.password === passwordInput.confirm_password) {
      return null;
    } else {
      return passwordKey.controls.confirm_password.setErrors({ passwordNotEquivalent: true });
    }
  }

  checkPasswordStrength(passwordKey: any) {
    const passwordInput = passwordKey.value;
    const strongRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}');
    if (strongRegEx.test(passwordInput.password)) {
      return null;
    } else {
      let message = '';
      const password = passwordInput.password;

      if (!password.match(/[{6,}]/)) {
        message = 'At least 6 characters required';
      }

      if (!password.match(/[a-z]/)) {
        message = 'At least 1 lowercase character required';
      }

      if (!password.match(/[A-Z]/)) {
        message = 'At least 1 uppercase character required';
      }

      if (!password.match(/[0-9]/)) {
        message = 'At least 1 numeric character required';
      }

      if (!password.match(/[!@#\$%\^&]/)) {
        message = 'At least 1 special character required';
      }

      return passwordKey.controls.password.setErrors({ passwordNotStrong: true, error_message: message });
    }
  }
}
