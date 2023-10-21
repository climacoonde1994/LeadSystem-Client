import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordFormGroup: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.forgotPasswordFormGroup = this.formBuilder.group({
      emailAddress: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {

    const request: any = {
      emailAddress: this.forgotPasswordForm.emailAddress.value,
    };

    this.authenticationService.forgotPassword(request)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/forgot-password-confirm']);
          },
          error: error => {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
        });
  }

  get forgotPasswordForm() {
    return this.forgotPasswordFormGroup.controls;
  }

}
