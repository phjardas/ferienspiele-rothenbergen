import 'rxjs/add/operator/mergeMap';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RegistrationService } from './registration.service';
import { Registration } from './model';


@Component({
  selector: 'registration-details',
  templateUrl: 'registration-details.component.html'
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  reg: Registration;

  constructor(private route: ActivatedRoute, registrationService: RegistrationService) {
    this.subscription = route.paramMap
      .mergeMap(params => registrationService.getRegistration(params.get('id')))
      .subscribe(reg => this.reg = reg);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
