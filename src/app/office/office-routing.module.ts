import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../auth/guard';

import { DashboardComponent } from './dashboard.component';
import { OfficeComponent } from './office.component';
import { RegistrationDetailsComponent } from './registration-details.component';


const routes: Routes = [
  {
    path: 'office',
    component: OfficeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['office'] },
    children: [
      { path: 'anmeldung/:id', component: RegistrationDetailsComponent },
      { path: '', component: DashboardComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OfficeRoutingModule {}
