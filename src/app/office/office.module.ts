import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
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
  providers: []
})
export class OfficeModule {}
