import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { WhiteSpace } from '../../../helpers/whitespace.validator';

import { LoadingService } from 'src/app/services/loader.service';
import { UserTypeService } from 'src/app/services/usertype.service';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})

export class UserModalComponent implements OnInit {

  @Input() item: any;
  public roles: any[];
  public errors: any[];
  public modalFormGroup: FormGroup;
  public usertypes : any[];
  

  public user: any = {};
 

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private toastHelper: ToastHelper,
    private loadingService : LoadingService,

    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user').toString())
    this.userTypeService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.usertypes = response
      this.usertypes =this.usertypes.filter(x => x.Enabled)
      var defaultsource = this.usertypes.filter(x => x.Default == true)[0]
        if(defaultsource != null && defaultsource != null && this.item == null)
        {
          this.modalFormGroup.get('UserTypeId').setValue(defaultsource._id);
        }
        }
      }
    );

	
    this.modalFormGroup = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      MiddleName: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Mobile: new FormControl('', [Validators.required]),
      UserType: new FormControl('' ),
      UserTypeId: new FormControl('', [Validators.required]),
      Status: new FormControl('Active', [Validators.required]),
    } );

    this.modalFormGroup.patchValue(this.item);
 
  }

  onSubmit() {
    this.loadingService.isLoading = true
    const request: any = { 
      UserName: this.modalForm.UserName.value,
      FirstName: this.modalForm.FirstName.value,
      LastName: this.modalForm.LastName.value,
      MiddleName: this.modalForm.MiddleName.value,
      Email: this.modalForm.Email.value,
      Mobile: this.modalForm.Mobile.value,
      UserType: this.modalForm.UserType.value,
      UserTypeId: this.modalForm.UserTypeId.value,
      Status: this.modalForm.Status.value,
      CreatedById  : "",
      UpdatedById  : ""
    };

    if (this.item == null){
      request.CreatedById = this.user._id
      this.userService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully created " + request.FirstName + " " +  request.LastName+ ".");
          this.activeModal.close();
          }
          else{
            this.errors = response.message
            this.loadingService.isLoading = false;
          }
       
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {
      request.Id = this.item._id;
      request.UpdatedById = this.user._id
      this.userService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully updated " + request.FirstName + " " +  request.LastName+ ".");
            this.activeModal.close();
          }
          else{
            this.errors = response.message
            this.loadingService.isLoading = false;
          }
         
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onUserTypeChange(event  : any){

    var typename = this.usertypes.find(x => x._id == event);
    this.modalFormGroup.get('UserType').setValue(typename.Name);
 
  }

}
