import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';

import { FormFieldComponent, FormFieldInputDirective } from './form-field.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormFieldComponent,
    FormFieldInputDirective,
  ],
  exports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormFieldInputDirective,
  ]
})
export class FormModule {}
