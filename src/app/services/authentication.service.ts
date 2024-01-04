import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { RepositoryHelper } from '../helpers/repository.helper';
import { ClaimType } from '../variables/claim-type.enum';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})

export class AuthenticationService {

  private authenticationChange = new Subject<boolean>();
  private user = new Subject<any>();
  public authenticationChanged = this.authenticationChange.asObservable();
  public loggedUser = this.user.asObservable();
  public decodedToken: { [key: string]: string };
  private userInactive: Subject<void> = new Subject<void>();
  private readonly INACTIVITY_TIMEOUT = 300000; // 5 minutes (adjust as needed)
  private readonly LOGOUT_REDIRECT_URL = '/login'; // Redirect URL after logout
  private FullName : string =""

  constructor(private repositoryHelper: RepositoryHelper, private router: Router,private jwtHelperService: JwtHelperService) { }

  public login = (body: any) => {
    return this.repositoryHelper.post('api/authentication/Login', body)
      .pipe(map(data => {
        var response = data['response'];
      
        if (response.succeeded){
         this.FullName = response.data.User.FullName
         console.log(response)
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify( response.data.User));
          localStorage.setItem('employee', JSON.stringify( response.data.Employee));
          localStorage.setItem('permissions', JSON.stringify( response.data.Permission));
          this.setAuthenticationState(true);
          this.setALoggedUser(response.data.User);
        }
        return response;
    }));
  }

    public startInactivityTimer(): void {

     
        timer(this.INACTIVITY_TIMEOUT)
          .pipe(
            takeUntil(this.userInactive),
            map(() => {
              this.logout();
              this.router.navigate(["/login"]);
            })
          )
          .subscribe( );
      }

    public resetInactivityTimer(): void {
        this.userInactive.next();
    }


  public confirmEmail = (body: any) => {
    return this.repositoryHelper.post('api/authentication/confirmEmail', body)
      .pipe(map(response => {
        return response;
    }));
  }

  public forgotPassword = (body: any) => {
    return this.repositoryHelper.post('api/authentication/forgotPassword', body)
      .pipe(map(response => {
        return response;
    }));
  }

  public resetPassword = (body: any) => {
    return this.repositoryHelper.post('api/authentication/resetPassword', body)
      .pipe(map(response => {
        return response;
    }));
  }

  public forceChangePassword = (body: any) => {
    return this.repositoryHelper.post('api/authentication/forceChangePassword', body)
      .pipe(map(response => {
        return response;
    }));
  }

  

  public logout = () => {
    localStorage.removeItem("token");
    this.setAuthenticationState(false);
  }

  public isAuthenticated = (): boolean => {
  
    const token = localStorage.getItem("token")!;
    
    return token != null && !this.jwtHelperService.isTokenExpired(token);
  }

  public setAuthenticationState = (isAuthenticated: boolean) => {
    this.authenticationChange.next(isAuthenticated);
  }

  public setALoggedUser = (user: any) => {
    this.user.next(user);
  }

  public decodeToken = () => {
    if (this.isAuthenticated()){
      const token = localStorage.getItem("token")!;
      this.decodedToken = this.jwtHelperService.decodeToken(token);
    }
  }
 
  
   


}
