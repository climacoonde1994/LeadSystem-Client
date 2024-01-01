import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loader.service';

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
    private loadingService : LoadingService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
     
      username: new FormControl('admin', [Validators.required ]),
      password: new FormControl('onde1994', [Validators.required]),
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {

    this.loadingService.isLoading = true;
    const request: any = {
    
      username: this.loginForm.username.value,
      password: this.loginForm.password.value
    };

    this.authenticationService.login(request)
        .pipe(first())
        .subscribe({
          next: response => {
            this.router.navigate([this.returnUrl]);
            this.loadingService.isLoading = false;
          },
          error: error => {
          
            this.errorMessage = error.message
            this.showError = true;
            this.loadingService.isLoading = false;
          }
        });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
