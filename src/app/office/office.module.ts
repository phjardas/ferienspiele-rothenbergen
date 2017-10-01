import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { SharedModule } from '../shared.module';
import { OfficeRoutingModule } from './office-routing.module';

import { ExcelService } from './excel.service';
import { RegistrationService } from './registration.service';

import { OfficeComponent } from './office.component';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './statistics.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    SharedModule,
    OfficeRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    OfficeComponent,
    StatisticsComponent,
    RegistrationDetailsComponent,
  ],
  providers: [
    ExcelService,
    RegistrationService,
  ]
})
export class OfficeModule {}
