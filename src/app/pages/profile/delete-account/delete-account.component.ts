import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFingerprint, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  username: string;
  userId: string;
  showAccountForm = false;

  // Toggable
  isDeleteable = false;

  // Icon
  faFingerprint = faFingerprint;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  deleteAccountForm = this.fb.group({
    username: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');
    this.onDeleteAccountFormChanges();
  }

  openConfirmAccountDeletionDialog() {
    console.log(this.deleteAccountForm.value);
  }

  onDeleteAccountFormChanges() {
    this.deleteAccountForm.valueChanges.subscribe(val => {
      if (val.username === this.username) {
        this.isDeleteable = true;
      } else {
        this.isDeleteable = false;
      }
    });
  }

}
