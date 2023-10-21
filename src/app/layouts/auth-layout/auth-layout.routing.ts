import { Routes, RouterModule } from '@angular/router';
import { GuardHelper } from 'src/app/helpers/guard.helper';

import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { ConfirmEmailComponent } from 'src/app/pages/account/confirm-email/confirm-email.component';
import { ForgotPasswordConfirmComponent } from 'src/app/pages/account/forgot-password-confirm/forgot-password-confirm.component';
import { ForgotPasswordComponent } from 'src/app/pages/account/forgot-password/forgot-password.component';
import { ResetPasswordConfirmComponent } from 'src/app/pages/account/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from 'src/app/pages/account/reset-password/reset-password.component';
import { ForceChangePasswordComponent } from 'src/app/pages/account/force-change-password/force-change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password-confirm', component: ForgotPasswordConfirmComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-confirm', component: ResetPasswordConfirmComponent },
  { path: 'force-change-password', component: ForceChangePasswordComponent, canActivate: [GuardHelper] },
];

export const AuthLayoutRoutes = RouterModule.forChild(routes);
