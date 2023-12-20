import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { JwtInterceptorHelper } from './helpers/jwt-interceptor.helper';
import { ErrorInterceptorHelper } from './helpers/error-interceptor.helper';
import { ToastComponent } from './components/toast/toast.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { LoaderComponent } from './pages/loader/loader.component';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent,
    InternalServerComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    NgxMaskModule.forRoot(maskConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorHelper, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorHelper, multi: true },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

export function getToken() {
  return localStorage.getItem("token");
}
