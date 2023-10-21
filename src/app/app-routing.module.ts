import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardHelper } from './helpers/guard.helper';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(x => x.AuthLayoutModule)
      }
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/dashboard-layout/dashboard-layout.module').then(x => x.DashboardLayoutModule)
      }
    ] 
  },
  {
    path: '401',
    component: UnauthorizedComponent,
  },
  {
    path: '403',
    component: ForbiddenComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '500',
    component: InternalServerComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
