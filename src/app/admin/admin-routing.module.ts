import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../auth';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'users' },
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
export class AdminRoutingModule {}
