import 'rxjs/add/operator/mergeMap';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, User } from '../auth';
import { RegistrationService } from './registration.service';
import { Registration } from '../model';


@Component({
  templateUrl: 'registration-details.component.html'
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  user: User;
  reg: Registration;

  constructor(
    private route: ActivatedRoute,
    auth: AuthenticationService,
    private registrationService: RegistrationService
  ) {
    this.subscription = auth.user.subscribe(user => this.user = user);
    this.subscription.add(route.paramMap
      .mergeMap(params => this.registrationService.getRegistration(params.get('id')))
      .subscribe(reg => this.reg = reg));
  }

  printWaiver() {
    this.registrationService.getWaiver(this.reg)
      .then(blob => {
        const { document } = window;
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a');
        a.href = url;
        a.download = `Einverständniserklärung ${this.reg.child.firstName} ${this.reg.child.lastName}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  }

  setPaymentReceived(received: boolean) {
    this.registrationService.setPaymentReceived(this.reg.id, received);
  }

  setWaiverReceived(received: boolean) {
    this.registrationService.setWaiverReceived(this.reg.id, received);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}