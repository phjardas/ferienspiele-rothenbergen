import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: RegistrationComponent }, { path: ':id', component: RegistrationDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
