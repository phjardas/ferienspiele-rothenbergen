import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { SharedModule }   from '../shared.module';
import { FormModule }   from '../form';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthenticationService } from './authentication.service';
import { RoleGuard } from './guard';

import { ActionComponent } from './action.component';
import { LoginComponent } from './login.component';
import { PasswordResetComponent } from './password-reset.component';
import { ResetPasswordComponent } from './reset-password.component';
import { RegisterComponent } from './register.component';


@NgModule({
  imports: [
    CommonModule,
    FormModule,
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [
    ActionComponent,
    LoginComponent,
    PasswordResetComponent,
    ResetPasswordComponent,
    RegisterComponent,
  ],
  providers: [
    AuthenticationService,
    RoleGuard,
  ]
})
export class AuthModule {}
