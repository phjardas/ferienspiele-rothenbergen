import 'rxjs/add/operator/mergeMap';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RegistrationService } from './registration.service';
import { Registration } from '../model';

@Component({
  templateUrl: 'registration-details.component.html',
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  reg: Registration;
  paymentWorking: string;
  waiverWorking: boolean;

  constructor(private route: ActivatedRoute, private registrationService: RegistrationService) {
    this.subscription = route.paramMap
      .mergeMap(params => this.registrationService.getRegistration(params.get('id')))
      .subscribe(reg => (this.reg = reg));
  }

  printWaiver() {
    this.waiverWorking = true;
    this.registrationService.getWaiver(this.reg).then(blob => {
      const { document } = window;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Einverständniserklärung ${this.reg.child.firstName} ${this.reg.child.lastName}.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.waiverWorking = false;
    });
  }

  setPaymentReceived(type: string) {
    this.paymentWorking = type;
    this.registrationService.setPaymentReceived(this.reg.id, type).then(_ => (this.paymentWorking = null));
  }

  setPaymentNotReceived() {
    this.paymentWorking = 'reset';
    this.registrationService.setPaymentNotReceived(this.reg.id).then(_ => (this.paymentWorking = null));
  }

  setWaiverReceived(received: boolean) {
    this.registrationService.setWaiverReceived(this.reg.id, received);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
