import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { environment } from '../environments/environment';

import { RoleGuard } from './auth/guard';

import { DashboardComponent } from './dashboard.component';
import { ImprintComponent } from './imprint.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
  {
    path: 'anmeldung',
    loadChildren: 'app/registration/registration.module#RegistrationModule',
  },
  {
    path: 'office',
    loadChildren: 'app/office/office.module#OfficeModule',
    canLoad: [RoleGuard],
    data: { roles: ['office']}
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [RoleGuard],
    data: { roles: ['admin']}
  },
  { path: 'impressum', component: ImprintComponent },
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
