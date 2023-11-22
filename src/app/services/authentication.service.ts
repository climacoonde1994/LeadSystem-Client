import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RepositoryHelper } from '../helpers/repository.helper';
import { ClaimType } from '../variables/claim-type.enum';

@Injectable({ providedIn: 'root'})

export class AuthenticationService {

  private authenticationChange = new Subject<boolean>();
  private user = new Subject<any>();
  public authenticationChanged = this.authenticationChange.asObservable();
  public loggedUser = this.user.asObservable();
  public decodedToken: { [key: string]: string };
  private FullName : string =""

  constructor(private repositoryHelper: RepositoryHelper, private jwtHelperService: JwtHelperService) { }

  public login = (body: any) => {
    return this.repositoryHelper.post('api/authentication/Login', body)
      .pipe(map(data => {
        var response = data['response'];
      
        if (response.succeeded){
         this.FullName = response.data.User.FullName
          localStorage.setItem('token', response.token);
          this.setAuthenticationState(true);
          this.setALoggedUser(response.data.User);
        }
        return response;
    }));
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
