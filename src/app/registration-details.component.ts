import 'rxjs/add/operator/mergeMap';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, User } from './authentication.service';
import { RegistrationService } from './registration.service';
import { Registration } from './model';


@Component({
  selector: 'registration-details',
  templateUrl: 'registration-details.component.html'
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  user: User;
  reg: Registration;

  constructor(private route: ActivatedRoute, auth: AuthenticationService, private registrationService: RegistrationService) {
    this.subscription = auth.user.subscribe(user => this.user = user);
    this.subscription.add(route.paramMap
      .mergeMap(params => this.registrationService.getRegistration(params.get('id')))
      .subscribe(reg => this.reg = reg));
  }

  printWaiver() {
    alert('FIXME: not implemented yet!');
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
