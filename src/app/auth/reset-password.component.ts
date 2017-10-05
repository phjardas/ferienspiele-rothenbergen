import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  @Input() code: string;
  form: FormGroup;
  formError: string;
  submitting = false;
  success = false;

  constructor(
    private auth: AuthenticationService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      password: '',
    });
  }

  submit() {
    this.success = false;
    this.formError = null;
    this.submitting = true;
    const { password } = this.form.value;
    this.auth.confirmPasswordReset(this.code, password)
      .then(_=> { this.success = true; this.submitting = false; })
      .catch(err => { this.submitting = false; this.formError = err.message; });
  }
}
