import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { ConfigurationService } from './configuration.service';
import { RegistrationStatusService, RegistrationStatus } from './registration-status.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  title: string = environment.title;
  startDate: string = environment.startDate;
  endDate: string = environment.endDate;
  registrationStatus: RegistrationStatus['status'];
  registrationDeadline: string;
  private sub: Subscription;

  constructor(reg: RegistrationStatusService) {
    this.sub = reg.status.subscribe(({ status, registrationDeadline }) => {
      this.registrationStatus = status;
      this.registrationDeadline = registrationDeadline;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
