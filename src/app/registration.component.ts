import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { CustomValidators } from './validators';
import { Registration, ShirtSize } from './model';


@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent {
  form: FormGroup;
  shirtSizes = ShirtSize.values;

  constructor(private router: Router, private registrationService: RegistrationService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      child: formBuilder.group({
        firstName: ['Testine', Validators.required],
        lastName: ['Tester', Validators.required],
        gender: ['w', [Validators.required, CustomValidators.oneOf('m', 'w')]],
        dateOfBirth: ['2010-04-01', Validators.required],
        shirtSize: ['CHILDREN_S', [Validators.required, CustomValidators.oneOf(...ShirtSize.values.map(s => s.id))]],
      }),
    });
  }

  submit() {
    const reg = new Registration(this.form.value);
    this.registrationService.submitRegistration(reg).first().subscribe(
      reg => this.router.navigate(['/registration', reg.id]),
      err => console.error('error:', err)
    );
  }
}
