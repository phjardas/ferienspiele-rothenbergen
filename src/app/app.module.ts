import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { ReactiveFormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AuthenticationService } from './authentication.service';
import { RegistrationService } from './registration.service';
import { WaiverService } from './waiver.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { MainMenuComponent } from './main-menu.component';
import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';
import { DashboardComponent as OfficeDashboardComponent } from './office';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/:id', component: RegistrationDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'office', component: OfficeDashboardComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainMenuComponent,
    RegistrationComponent,
    RegistrationDetailsComponent,
    OfficeDashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthenticationService,
    RegistrationService,
    WaiverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
