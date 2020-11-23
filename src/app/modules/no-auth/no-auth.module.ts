import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from '../general/general.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GeneralModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LoginComponent, SignupComponent]
})
export class NoAuthModule { }
