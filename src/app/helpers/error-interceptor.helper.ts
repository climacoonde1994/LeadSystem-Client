import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class ErrorInterceptorHelper implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(httpErrorResponse => {
      if (httpErrorResponse.status === 500) {
        this.router.navigate(['/500']);
      }
      else if (httpErrorResponse.status === 404) {
        this.router.navigate(['/404']);
      }
      else if (httpErrorResponse.status === 403) {
        this.router.navigate(['/403']);
      }
      else if (httpErrorResponse.status === 401) {
        this.router.navigate(['/401']);
      }

      const error = httpErrorResponse.error || httpErrorResponse.statusText;
      return throwError(error);
    }));
  }
}
