import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationService } from './registration.service';
import { KuchenService } from './kuchen.service';
import { WaiverService } from './waiver.service';

@NgModule({
  imports: [CommonModule],
  providers: [RegistrationService, KuchenService, WaiverService],
})
export class RegistrationServiceModule {}
