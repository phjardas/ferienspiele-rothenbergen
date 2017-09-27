import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthenticationService } from './authentication.service';
import { RoleGuard } from './guard';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    AuthenticationService,
    RoleGuard,
  ]
})
export class AuthModule {}
