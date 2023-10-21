import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class EnvironmentHelper {

  public url: string = environment.url;

  constructor() { }

}
