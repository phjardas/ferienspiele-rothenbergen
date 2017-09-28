import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsersService } from './users.service';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
  providers: [
    UsersService,
  ]
})
export class AdminModule {}
