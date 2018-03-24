import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth';

import { ConfigurationService } from './configuration.service';
import { RegistrationService } from './registration.service';
import { KuchenService } from './kuchen.service';
import { WaiverService } from './waiver.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ImprintComponent } from './imprint.component';
import { MainMenuComponent } from './main-menu.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, DashboardComponent, ImprintComponent, MainMenuComponent],
  providers: [
    { provide: LOCALE_ID, useValue: environment.locale },
    ConfigurationService,
    RegistrationService,
    KuchenService,
    WaiverService,
  ],
  bootstrap: [AppComponent],
})
export class MainModule {}
