import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-snackbar',
  templateUrl: './signup-snackbar.component.html',
  styleUrls: ['./signup-snackbar.component.scss']
})
export class SignupSnackbarComponent implements OnInit {
  // Icons
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
