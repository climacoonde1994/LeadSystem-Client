import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { UserTypeService } from 'src/app/services/usertype.service';
import { LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public modalFormGroup: FormGroup;
  public errors: any[];
  public user: any = {};
  public usertypes : any[];
  constructor(public activatedRoute: ActivatedRoute,
    private userTypeService: UserTypeService,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private toastHelper : ToastHelper,
    private loadingService : LoadingService,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user').toString())
    console.log( this.user)
    this.modalFormGroup = this.formBuilder.group({
      Id :new FormControl(this.user._id),
      UserName: new FormControl(this.user.UserName, [Validators.required]),
      Password : new FormControl(this.user.Password, [Validators.required]),
      FirstName: new FormControl(this.user.FirstName, [Validators.required]),
      LastName: new FormControl(this.user.LastName, [Validators.required]),
      MiddleName: new FormControl(this.user.MiddleName),
      Email: new FormControl(this.user.Email, [Validators.required, Validators.email]),
      Mobile: new FormControl(this.user.Mobile, [Validators.required]),
      UserType: new FormControl(this.user.UserType, [Validators.required]),
      Status: new FormControl(this.user.Status, [Validators.required]),
    } );


    this.userTypeService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.usertypes = response
      this.usertypes =this.usertypes.filter(x => x.Enabled)
        }
      }
    );

  }
  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onSubmitDetails(){
  
    const request: any = { 
      Id: this.modalForm.Id.value,
      UserName: this.modalForm.UserName.value,
      Password: this.modalForm.Password.value,
      FirstName: this.modalForm.FirstName.value,
      LastName: this.modalForm.LastName.value,
      MiddleName: this.modalForm.MiddleName.value,
      Email: this.modalForm.Email.value,
      Mobile: this.modalForm.Mobile.value,
      UserType: this.modalForm.UserType.value,
      Status: this.modalForm.Status.value,
    };
    this.userService.update(request)
    .pipe(first())
    .subscribe({
      next: response => {
        this.modalService.open(LogoutConfirmComponent);
      },
      error: response => {
        this.errors = response.errors;
      }
    });
  }

  onChangePassword(){
  
    const request: any = { 
      Id: this.modalForm.Id.value,
      UserName: this.modalForm.UserName.value,
      Password: this.modalForm.Password.value,
    };
    this.userService.changepassword(request)
    .pipe(first())
    .subscribe({
      next: response => {
        this.modalService.open(LogoutConfirmComponent);
      },
      error: response => {
        this.errors = response.errors;
      }
    });
  }


}
