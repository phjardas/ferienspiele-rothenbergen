import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { ConfigurationService } from './configuration.service';
import { RegistrationService } from './registration.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  title: string;
  startDate: string;
  endDate: string;
  registrationStatus: string;
  registrationDeadline: string;
  private sub: Subscription;

  constructor(config: ConfigurationService, reg: RegistrationService) {
    this.title = environment.title;
    this.sub = config.configuration.map(c => c.startDate).subscribe(s => (this.startDate = s));
    this.sub.add(config.configuration.map(c => c.endDate).subscribe(s => (this.endDate = s)));
    this.sub.add(reg.registrationDeadline.subscribe(s => (this.registrationDeadline = s)));
    this.sub.add(reg.registrationStatus.subscribe(s => (this.registrationStatus = s)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
