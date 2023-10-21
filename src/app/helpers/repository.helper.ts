import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentHelper } from './environment.helper';

@Injectable({ providedIn: 'root' })

export class RepositoryHelper {

  constructor(private httpClient: HttpClient, private environmentHelper: EnvironmentHelper) { }

  public get = (route: string) => {
    return this.httpClient.get<any>(this.createCompleteRoute(route, this.environmentHelper.url));
  }

  public post = (route: string, body: any) => {
    return this.httpClient.post<any>(this.createCompleteRoute(route, this.environmentHelper.url), body, this.generateHeaders());
  }

  public put = (route: string, body: any) => {
    return this.httpClient.put<any>(this.createCompleteRoute(route, this.environmentHelper.url), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.httpClient.delete<any>(this.createCompleteRoute(route, this.environmentHelper.url));
  }

  public upload = (route: string, body: any  ) => {
    return this.httpClient.post<any>(this.createCompleteRoute(route, this.environmentHelper.url), body, this.generateContentHeaders());
  }

  private createCompleteRoute = (route: string, url: string) => {
    return `${url}/${route}`;
  }


  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  private generateContentHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Disposition' : 'multipart/form-data' })
    }
  }
}
