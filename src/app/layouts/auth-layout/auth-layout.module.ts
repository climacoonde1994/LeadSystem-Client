import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { ConfirmEmailComponent } from 'src/app/pages/account/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from 'src/app/pages/account/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from 'src/app/pages/account/forgot-password-confirm/forgot-password-confirm.component';
import { ResetPasswordComponent } from 'src/app/pages/account/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from 'src/app/pages/account/reset-password-confirm/reset-password-confirm.component';
import { ForceChangePasswordComponent } from 'src/app/pages/account/force-change-password/force-change-password.component';


@NgModule({
  imports: [
    CommonModule,
    AuthLayoutRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    LoginComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    ForceChangePasswordComponent
  ]
})
export class AuthLayoutModule { }
