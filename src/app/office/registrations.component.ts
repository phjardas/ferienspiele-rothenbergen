import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Component, OnDestroy } from '@angular/core';

import { RegistrationService } from './registration.service';
import { Registration } from '../model';

@Component({ templateUrl: 'registrations.component.html' })
export class RegistrationsComponent implements OnDestroy {
  registrations: Registration[];
  exportWorking = false;
  private sub: Subscription;

  constructor(private registrationService: RegistrationService) {
    this.sub = registrationService
      .getRegistrations()
      .map(regs => regs.sort(this.compareRegistrations))
      .subscribe(registrations => (this.registrations = registrations));
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
