import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from '../registration.service';
import { Registration } from '../model';


@Component({
  selector: 'office-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  registrations: Observable<Registration[]>;

  constructor(registrationService: RegistrationService) {
    this.registrations = registrationService.getRegistrations().map(regs => regs.sort(this.compareRegistrations));
  }

  private compareRegistrations(a: Registration, b: Registration): number {
    let comp = a.child.lastName.localeCompare(b.child.lastName);
    if (comp == 0) comp = a.child.firstName.localeCompare(b.child.firstName);
    return comp;
  }
}
