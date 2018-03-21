import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './authentication.service';

@Component({
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent {
  form: FormGroup;
  formError: string;
  submitting = false;
  success = false;

  constructor(private auth: AuthenticationService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: '',
    });
  }

  requestResetEmail() {
    this.success = false;
    this.formError = null;
    this.submitting = true;
    const { email } = this.form.value;
    this.auth
      .sendPasswordResetEmail(email)
      .then(_ => {
        this.success = true;
        this.submitting = false;
      })
      .catch(err => {
        this.submitting = false;
        this.formError = err.message;
      });
  }
}
