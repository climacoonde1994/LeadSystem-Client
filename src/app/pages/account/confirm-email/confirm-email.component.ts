import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EncoderHelper } from 'src/app/helpers/encoder.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  public id: string;
  public token: string;
  public errorMessage: string = '';
  public showError: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.token = this.activatedRoute.snapshot.queryParams['token'];

    let params = new HttpParams({ encoder: new EncoderHelper() });
    params = params.append('id', this.id);
    params = params.append('token', this.token);

    const request: any = {
      id: params.get('id'),
      token: params.get('token')
    };

    this.authenticationService.confirmEmail(request)
        .pipe(first())
        .subscribe({
          next: () => {

          },
          error: error => {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
        });
  }

}
