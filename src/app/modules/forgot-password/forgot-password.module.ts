import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "",
    component: ForgotPasswordComponent
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule
  ],
  exports: [RouterModule, MatStepperModule, MatButtonModule, ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
