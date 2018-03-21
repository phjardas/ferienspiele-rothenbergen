import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';
import { FormModule } from '../form';
import { RegistrationRoutingModule } from './registration-routing.module';

import { RegistrationComponent } from './registration.component';
import { RegistrationDetailsComponent } from './registration-details.component';

@NgModule({
  imports: [CommonModule, RegistrationRoutingModule, SharedModule, FormModule],
  declarations: [RegistrationComponent, RegistrationDetailsComponent],
})
export class RegistrationModule {}
