import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      // businessType: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('root@cornestech.co', [Validators.required, Validators.email]),
      password: new FormControl('P@ssw0rd', [Validators.required]),
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {

    const request: any = {
      // businessType: this.loginForm.businessType.value,
      emailAddress: this.loginForm.emailAddress.value,
      password: this.loginForm.password.value
    };

    this.authenticationService.login(request)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate([this.returnUrl]);
          },
          error: error => {
            this.errorMessage = error.error;
            this.showError = true;
          }
        });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
