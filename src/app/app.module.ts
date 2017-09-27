import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { ReactiveFormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { OfficeModule } from './office/office.module';

import { AuthenticationService } from './authentication.service';
import { RegistrationService } from './registration.service';
import { WaiverService } from './waiver.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { MainMenuComponent } from './main-menu.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainMenuComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    RegistrationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    OfficeModule,
    AppRoutingModule,
  ],
  providers: [
    AuthenticationService,
    RegistrationService,
    WaiverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
