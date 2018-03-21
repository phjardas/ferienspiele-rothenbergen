import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, AuthenticationProvider } from './authentication.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  formError: string;
  authenticationProviders: AuthenticationProvider[];

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute, formBuilder: FormBuilder) {
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
      .signinWithEmail(email, password)
      .then(_ => this.navigateAfterSignin())
      .catch(err => (this.formError = err.message));
  }

  signinWithProvider(type) {
    this.auth
      .signinWithProvider(type)
      .then(_ => this.navigateAfterSignin())
      .catch(err => (this.formError = err.message));
  }

  private navigateAfterSignin() {
    this.route.queryParamMap
      .first()
      .map(q => q.get('from') || '')
      .subscribe(path => this.router.navigate([`/${path}`]));
  }
}
