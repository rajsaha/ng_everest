import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@services/auth/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ManageModule } from './modules/manage/manage.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { GeneralModule } from './modules/general/general.module';
import { DialogsModule } from './modules/dialogs/dialogs.module';

import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { AtcComponent } from './general/dialogs/atc/atc.component';
import { PoComponent } from './general/dialogs/po/po.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SnackbarComponent } from './general/snackbar/snackbar.component';
import { ShareResourceComponent } from './pages/share-resource/share-resource.component';
import { MainComponent } from './layouts/main/main.component';
import { NoAuthComponent } from './layouts/no-auth/no-auth.component';
import { SearchComponent } from './components/search/search.component';
import { AddToCollectionComponent } from './components/add-to-collection/add-to-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    FeedComponent,
    PoComponent,
    PageNotFoundComponent,
    ShareResourceComponent,
    MainComponent,
    NoAuthComponent,
    SearchComponent,
    AddToCollectionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPasswordStrengthModule.forRoot(),
    // * Custom Modules
    MaterialModule,
    ManageModule,
    DialogsModule,
    GeneralModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AtcComponent, PoComponent, SnackbarComponent]
})
export class AppModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
