import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { SharedModule } from '../shared.module';
import { OfficeRoutingModule } from './office-routing.module';

import { ExcelService } from './excel.service';
import { RegistrationService } from './registration.service';

import { OfficeComponent } from './office.component';
import { DashboardComponent } from './dashboard.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OfficeRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    OfficeComponent,
    RegistrationDetailsComponent,
  ],
  providers: [
    ExcelService,
    RegistrationService,
  ]
})
export class OfficeModule {}
