import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, AuthenticationProvider } from './authentication.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  formError: string;
  authenticationProviders: AuthenticationProvider[];

  constructor(private auth: AuthenticationService, private router: Router, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authenticationProviders = auth.providers;
  }

  signin() {
    this.formError = null;
    const { email, password } = this.form.value;
    this.auth
      .createUserWithEmail(email, password)
      .then(_ => this.router.navigate(['/']))
      .catch(err => (this.formError = err.message));
  }

  signinWithProvider(type) {
    this.auth
      .signinWithProvider(type)
      .then(_ => this.router.navigate(['/']))
      .catch(err => (this.formError = err.message));
  }
}
