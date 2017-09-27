import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { DashboardComponent } from './dashboard.component';
import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
  { path: 'anmeldung', component: RegistrationComponent },
  { path: 'anmeldung/:id', component: RegistrationDetailsComponent },
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
