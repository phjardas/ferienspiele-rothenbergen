import 'rxjs/add/operator/mergeMap';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RegistrationService } from '../registration.service';
import { Registration } from '../model';


@Component({
  templateUrl: 'registration-details.component.html'
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  reg: Registration;
  registrationDeadline: string;
  waiverDeadline: string;

  constructor(private route: ActivatedRoute, private registrationService: RegistrationService) {
    this.subscription = route.paramMap
      .mergeMap(params => this.registrationService.getRegistration(params.get('id')))
      .subscribe(reg => this.reg = reg);
    this.subscription.add(registrationService.registrationDeadline.subscribe(d => this.registrationDeadline = d));
    this.subscription.add(registrationService.waiverDeadline.subscribe(d => this.waiverDeadline = d));
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
