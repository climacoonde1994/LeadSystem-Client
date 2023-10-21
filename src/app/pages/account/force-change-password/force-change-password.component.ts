import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EncoderHelper } from 'src/app/helpers/encoder.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-force-change-password',
  templateUrl: './force-change-password.component.html',
  styleUrls: ['./force-change-password.component.css']
})
export class ForceChangePasswordComponent implements OnInit {

  public forceChangePasswordFormGroup: FormGroup;
  public id: string;
  public token: string;
  public errorMessage: string = '';
  public showError: boolean;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.token = this.activatedRoute.snapshot.queryParams['token'];

    this.forceChangePasswordFormGroup = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validators: [MustMatch('password', 'confirmPassword')]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {

    let params = new HttpParams({ encoder: new EncoderHelper() });
    params = params.append('id', this.id);
    params = params.append('token', this.token);

    const request: any = {
      id: params.get('id'),
      token: params.get('token'),
      password: this.forceChangePasswordForm.password.value,
    };

    this.authenticationService.forceChangePassword(request)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate([this.returnUrl]);
          },
          error: error => {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
        });
  }

  get forceChangePasswordForm() {
    return this.forceChangePasswordFormGroup.controls;
  }

}
