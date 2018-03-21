import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from './registration.service';
import { Registration } from '../model';

@Component({ templateUrl: 'registrations.component.html' })
export class RegistrationsComponent {
  registrations: Observable<Registration[]>;
  exportWorking = false;

  constructor(private registrationService: RegistrationService) {
    this.registrations = registrationService.getRegistrations().map(regs => regs.sort(this.compareRegistrations));
  }

  private compareRegistrations(a: Registration, b: Registration): number {
    let comp = a.child.lastName.localeCompare(b.child.lastName);
    if (comp == 0) comp = a.child.firstName.localeCompare(b.child.firstName);
    return comp;
  }

  export() {
    this.exportWorking = true;
    this.registrationService
      .exportRegistrations()
      .first()
      .subscribe(blob => {
        const { document } = window;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Ferienspiele Rothenbergen Anmeldungen.xlsx`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.exportWorking = false;
      });
  }
}
