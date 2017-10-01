import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from '../registration.service';
import { CustomValidators } from '../validators';
import { Registration, ShirtSize, Price, PriceElement } from '../model';


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

  constructor(private router: Router, private registrationService: RegistrationService, formBuilder: FormBuilder) {
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
