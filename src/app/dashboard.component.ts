import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from './registration.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  registrationOpen: Observable<string>;
  registrationDeadline: Observable<string>;

  constructor(reg: RegistrationService) {
    this.registrationDeadline = reg.registrationDeadline;
    this.registrationOpen = reg.registrationOpen;
  }
}
