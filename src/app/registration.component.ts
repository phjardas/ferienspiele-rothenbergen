import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { CustomValidators } from './validators';
import { Registration, ShirtSize } from './model';


interface PriceElement {
  label: string;
  price: number;
}


@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent {
  error: string;
  form: FormGroup;
  shirtSizes = ShirtSize.values;
  priceElements: PriceElement[];
  totalPrice: number;

  constructor(private router: Router, private registrationService: RegistrationService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      child: formBuilder.group({
        firstName: ['Testine', Validators.required],
        lastName: ['Tester', Validators.required],
        gender: ['w', [Validators.required, CustomValidators.oneOf('m', 'w')]],
        dateOfBirth: ['2010-04-01', Validators.required],
        shirtSize: ['CHILDREN_S', [Validators.required, CustomValidators.oneOf(...ShirtSize.values.map(s => s.id))]],
        vegetarian: false,
        miscellaneous: '',
        nextChild: false,
      }),
      parent: formBuilder.group({
        phone: ['0123456789', Validators.required],
        email: ['philipp@jardas.de', [Validators.required, Validators.email]],
        street: ['Sackgasse 15', Validators.required],
        zip: ['12345', Validators.required],
        city: ['Musterhausen', Validators.required],
      }),
      emergencyContact: formBuilder.group({
        name: ['Name', Validators.required],
        phone: ['0123456789', Validators.required],
      }),
    });

    this.form.get('child.nextChild').valueChanges.forEach(this.updatePrice.bind(this));
    this.updatePrice(false);
  }

  private updatePrice(nextChild) {
    const priceElements = [{ label: 'Teilnahmebeitrag', price: 30 }];
    if (nextChild) priceElements.push({ label: 'Ermäßigung für Geschwisterkind', price: -5 });
    this.priceElements = priceElements;
    this.totalPrice = priceElements.reduce((a, b) => a += b.price, 0);
  }

  submit() {
    this.error = null;
    const reg = new Registration(this.form.value);
    this.registrationService.submitRegistration(reg).first().subscribe(
      reg => this.router.navigate(['/registration', reg.id]),
      err => this.error = err.message
    );
  }
}
