import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { RegistrationService } from './registration.service';
import { WaiverService } from './waiver.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { MainMenuComponent } from './main-menu.component';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MainMenuComponent,
    PageNotFoundComponent,
  ],
  providers: [
    RegistrationService,
    WaiverService,
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
