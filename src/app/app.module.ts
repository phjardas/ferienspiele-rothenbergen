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
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu.component';
import { DashboardComponent } from './dashboard.component';
import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/:id', component: RegistrationDetailsComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DashboardComponent,
    RegistrationComponent,
    RegistrationDetailsComponent,
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
    RegistrationService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
