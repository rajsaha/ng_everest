import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  strength = 0;
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
    let messages: Array<string> = [];
    const messageChars = 'At least 6 characters required';
    const messageLC = 'At least 1 lowercase character required';
    const messageUC = 'At least 1 uppercase character required';
    const messageNum = 'At least 1 numeric character required';
    const messageSpecial = 'At least 1 special character required';

    const passwordInput = passwordKey.value;
    const strongRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}');
    if (strongRegEx.test(passwordInput.password)) {
      return null;
    } else {
      let message = '';
      const password = passwordInput.password;

      if (!password.match(/[{6,}]/)) {
        messages.push(messageChars);
      } else {
        const index = messages.indexOf(messageChars);
        messages.splice(index, 1);
      }

      if (!password.match(/[a-z]/)) {
        messages.push(messageLC);
      } else {
        const index = messages.indexOf(messageLC);
        messages.splice(index, 1);
      }

      if (!password.match(/[A-Z]/)) {
        messages.push(messageUC);
      } else {
        const index = messages.indexOf(messageUC);
        messages.splice(index, 1);
      }

      if (!password.match(/[0-9]/)) {
        messages.push(messageNum);
      } else {
        const index = messages.indexOf(messageNum);
        messages.splice(index, 1);
      }

      if (!password.match(/[!@#\$%\^&]/)) {
        messages.push(messageSpecial);
      } else {
        const index = messages.indexOf(messageSpecial);
        messages.splice(index, 1);
      }

      return passwordKey.controls.password.setErrors({ passwordNotStrong: true, messages });
    }
  }

  checkValidURL(shareResourceForm: any) {
    const validURLRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (validURLRegex.test(shareResourceForm.value.url)) {
      return null;
    } else {
      const message = 'URL Invalid';
      return shareResourceForm.controls.url.setErrors({ urlInvalid: true, error_message: message });
    }
  }
}
