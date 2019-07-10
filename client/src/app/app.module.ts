import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@services/auth/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutosizeModule } from 'ngx-autosize';

// Angular Material
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatBadgeModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatDividerModule,
  MatRippleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule
} from '@angular/material';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './general/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AtcComponent } from './general/dialogs/atc/atc.component';
import { PoComponent } from './general/dialogs/po/po.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SnackbarComponent } from './general/snackbar/snackbar.component';
import { CpiComponent } from './general/dialogs/cpi/cpi.component';
import { ShareResourceComponent } from './pages/share-resource/share-resource.component';
import { ManageResourcesComponent } from './pages/manage-resources/manage-resources.component';
import { TruncatePipe } from './pipe/truncate';
import { DrComponent } from './general/dialogs/dr/dr.component';
import { ResourceComponent } from './general/resource/resource.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    FeedComponent,
    PostComponent,
    ProfileComponent,
    AtcComponent,
    PoComponent,
    PageNotFoundComponent,
    SnackbarComponent,
    CpiComponent,
    ShareResourceComponent,
    ManageResourcesComponent,
    TruncatePipe,
    DrComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // * Angular Material Modules
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatRippleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    // ! End of Material Angular Modules
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AutosizeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AtcComponent, PoComponent, SnackbarComponent, CpiComponent, DrComponent]
})
export class AppModule { }
