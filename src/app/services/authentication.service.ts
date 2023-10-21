import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RepositoryHelper } from '../helpers/repository.helper';
import { ClaimType } from '../variables/claim-type.enum';

@Injectable({ providedIn: 'root'})

export class AuthenticationService {

  private authenticationChange = new Subject<boolean>();
  public authenticationChanged = this.authenticationChange.asObservable();
  public decodedToken: { [key: string]: string };

  constructor(private repositoryHelper: RepositoryHelper, private jwtHelperService: JwtHelperService) { }

  public login = (body: any) => {
    return this.repositoryHelper.post('api/authentication/Login', body)
      .pipe(map(data => {
        var response = data['response'];
      
        if (response.succeeded){
          console.log(response)
          localStorage.setItem('token', response.data.token);
          this.setAuthenticationState(true);
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

  public getRolePermissionList = (id: string) => {
    return this.repositoryHelper.get('api/authentication/getRolePermissionList?id=' + id)
      .pipe(map(response => {
        return response;
        console.log(response);
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
    alert("11")
    this.authenticationChange.next(isAuthenticated);
  }

  public decodeToken = () => {
    if (this.isAuthenticated()){
      const token = localStorage.getItem("token")!;
      this.decodedToken = this.jwtHelperService.decodeToken(token);
    }
  }

  public getId = () => {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken[ClaimType.Id] : null;
  }

  public getName = () => {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken[ClaimType.Name] : null;
  }

  public getRole = () => {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken[ClaimType.Role] : null;
  }

  public getRoleId = () => {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken[ClaimType.RoleId] : null;
  }


}
