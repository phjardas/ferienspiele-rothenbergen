import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { SharedModule } from '../shared.module';
import { FormModule }   from '../form';
import { OfficeRoutingModule } from './office-routing.module';

import { ExcelService } from './excel.service';
import { RegistrationService } from './registration.service';

import { CodesComponent } from './codes.component';
import { OfficeComponent } from './office.component';
import { RegistrationsComponent } from './registrations.component';
import { StatisticsComponent } from './statistics.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    SharedModule,
    FormModule,
    OfficeRoutingModule,
  ],
  declarations: [
    CodesComponent,
    OfficeComponent,
    RegistrationsComponent,
    RegistrationDetailsComponent,
    StatisticsComponent,
  ],
  providers: [
    ExcelService,
    RegistrationService,
  ]
})
export class OfficeModule {}
