import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';

import { RegistrationService } from './registration.service';

import { OfficeComponent } from './office.component';
import { DashboardComponent } from './dashboard.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  imports: [
    CommonModule,
    OfficeRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    OfficeComponent,
    RegistrationDetailsComponent,
  ],
  providers: [
    RegistrationService,
  ]
})
export class OfficeModule {}
