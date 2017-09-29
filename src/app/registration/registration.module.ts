import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';

import { SharedModule } from '../shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';

import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    SharedModule,
  ],
  declarations: [
    RegistrationComponent,
    RegistrationDetailsComponent,
  ],
})
export class RegistrationModule { }
