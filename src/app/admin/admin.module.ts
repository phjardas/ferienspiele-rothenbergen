import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';
import { FormModule } from '../form';
import { AdminRoutingModule } from './admin-routing.module';

import { UsersService } from './users.service';

import { AdminComponent } from './admin.component';
import { ConfigComponent } from './config.component';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [CommonModule, SharedModule, FormModule, AdminRoutingModule],
  declarations: [AdminComponent, ConfigComponent, UsersComponent],
  providers: [UsersService],
})
export class AdminModule {}
