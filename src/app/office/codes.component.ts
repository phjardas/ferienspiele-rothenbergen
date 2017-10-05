import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { RegistrationCode } from '../model';


@Component({ templateUrl: 'codes.component.html' })
export class CodesComponent {
  form: FormGroup;
  formError: string;
  formSubmitting = false;
  createdCode: string;
  codes: Observable<RegistrationCode[]>;
  urlCopied: string

  constructor(private registrationService: RegistrationService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      label: ['', Validators.required],
    });
    this.codes = registrationService.getRegistrationCodes()
      .map(codes => codes.sort(this.compareRegistrationCodes));
  }

  private compareRegistrationCodes(a: RegistrationCode, b: RegistrationCode): number {
    return a.label.localeCompare(b.label);
  }

  createCode() {
    this.createdCode = null;
    this.formSubmitting = true;
    this.formError = null;
    const { label } = this.form.value;

    this.registrationService.createRegistrationCode(label)
      .then(code => {
        console.log('created:', code);
        this.formSubmitting = false;
        this.createdCode = code;
      })
      .catch(err => {
        this.formSubmitting = false;
        this.formError = err.message;
      });
  }

  copyURL(code) {
    const a = document.getElementById(`code_${code}_url`) as HTMLAnchorElement;
    const url = a.href;
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Error copying URL to clipboard:', err);
    }

    document.body.removeChild(input);
    this.urlCopied = code;
  }
}
