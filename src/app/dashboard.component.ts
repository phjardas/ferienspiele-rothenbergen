import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { ConfigurationService } from './configuration.service';
import { RegistrationService } from './registration.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {
  title: string;
  registrationStatus: Observable<string>;
  registrationDeadline: Observable<string>;

  constructor(config: ConfigurationService, reg: RegistrationService) {
    this.title = environment.title;
    this.registrationDeadline = reg.registrationDeadline;
    this.registrationStatus = reg.registrationStatus;
  }
}
