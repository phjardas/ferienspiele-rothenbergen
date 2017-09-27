import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

import { AuthenticationService, AuthenticationProvider } from './authentication.service';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  signinForm: FormGroup;
  signinFormError: string;
  registerForm: FormGroup;
  registerFormError: string;
  subscription: Subscription;
  authenticationProviders: AuthenticationProvider[];

  constructor(private authenticationService: AuthenticationService, router: Router, formBuilder: FormBuilder) {
    this.signinForm = formBuilder.group({ email: '', password: '' });
    this.registerForm = formBuilder.group({ email: '', password: '' });

    this.authenticationProviders = authenticationService.providers;
    this.subscription = authenticationService.user
      .filter(user => user != null)
      .first()
      .subscribe(_=> router.navigate(['/office']));
  }

  signin() {
    this.signinFormError = null;
    const { email, password } = this.signinForm.value;
    this.authenticationService.signinWithEmail(email, password).catch(err => this.signinFormError = err.message);
  }

  register() {
    this.registerFormError = null;
    const { email, password } = this.registerForm.value;
    this.authenticationService.createUserWithEmail(email, password).catch(err => this.registerFormError = err.message);
  }

  signinWithProvider(type) {
    this.authenticationService.signinWithProvider(type);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
