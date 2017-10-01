import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../auth';

import { DashboardComponent } from './dashboard.component';
import { OfficeComponent } from './office.component';
import { RegistrationDetailsComponent } from './registration-details.component';
import { StatisticsComponent } from './statistics.component';


const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['office'] },
    children: [
      { path: 'anmeldungen/:id', component: RegistrationDetailsComponent },
      { path: 'anmeldungen', component: DashboardComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: '', redirectTo: 'anmeldungen' },
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
