import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from '../registration.service';
import { ConfigurationService } from '../configuration.service';
import { CustomValidators } from '../validators';
import { Registration, ShirtSize, Price, PriceElement } from '../model';
import { createTestData } from './testdata';


interface InitialDataProvider {
  createInitialData(): any;
}

class TestDataProvider implements InitialDataProvider {
  createInitialData() {
    return createTestData();
  }
}

class NoDataProvider implements InitialDataProvider {
  createInitialData() {
    return {};
  }
}


@Component({
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent {
  error: string;
  form: FormGroup;
  submitting: boolean;
  shirtSizes = ShirtSize.values;
  price: Price;
  registrationStatus: Observable<string>;
  registrationDeadline: Observable<string>;
  enableTestData: Observable<boolean>;

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    config: ConfigurationService,
    formBuilder: FormBuilder
  ) {
    this.registrationStatus = registrationService.registrationStatus;
    this.registrationDeadline = registrationService.registrationDeadline;

    this.form = formBuilder.group({
      child: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', [Validators.required, CustomValidators.oneOf('m', 'w')]],
        dateOfBirth: ['', Validators.required],
        shirtSize: ['', [Validators.required, CustomValidators.oneOf(...ShirtSize.values.map(s => s.id))]],
        vegetarian: false,
        miscellaneous: '',
        nextChild: false,
      }),
      parent: formBuilder.group({
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: ['', Validators.required],
        zip: ['', Validators.required],
        city: ['', Validators.required],
      }),
      emergencyContact: formBuilder.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
      }),
    });

    this.enableTestData = config.configuration
      .map(c => c.enableTestData);

    const updatePrice = values => this.price = new Registration(values).price;
    this.form.valueChanges.forEach(updatePrice);
    updatePrice(this.form.value);
  }

  createTestData() {
    this.enableTestData.map(enable => enable ? new TestDataProvider() : new NoDataProvider())
      .first()
      .map(p => p.createInitialData())
      .subscribe(data => this.form.patchValue(data));
  }

  submit() {
    this.error = null;
    this.submitting = true;
    const reg = new Registration(this.form.value);
    this.registrationService.submitRegistration(reg).first().subscribe(
      reg => this.router.navigate(['/anmeldung', reg.id]),
      err => { this.submitting = false; this.error = err.message; }
    );
  }
}
