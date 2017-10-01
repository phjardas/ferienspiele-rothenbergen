import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from '../registration.service';
import { ConfigurationService } from '../configuration.service';
import { CustomValidators } from '../validators';
import { Registration, ShirtSize, Price, PriceElement } from '../model';


interface InitialDataProvider {
  createInitialData(): any;
}

class TestDataProvider implements InitialDataProvider {
  createInitialData() {
    console.log('testdata: create');
    return {
      child: {
        firstName: 'Testine',
        lastName: 'Tester',
        gender: 'w',
        dateOfBirth: '2010-04-01',
        shirtSize: 'CHILDREN_S',
      },
      parent: {
        phone: '01234-567890',
        email: 'ferienspiele-rothenbergen@mailinator.com',
        street: 'Mustergasse 12',
        zip: '67890',
        city: 'Musterhausen',
      },
      emergencyContact: {
        name: 'Martina Mustermann',
        phone: '01234-567890',
      },
    };
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

    config.configuration
      .map(c => c.enableTestData ? new TestDataProvider() : new NoDataProvider())
      .first()
      .map(p => p.createInitialData())
      .subscribe(data => this.form.patchValue(data));

    const updatePrice = values => this.price = new Registration(values).price;
    this.form.valueChanges.forEach(updatePrice);
    updatePrice(this.form.value);
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
