import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { WhiteSpace } from '../../../helpers/whitespace.validator';



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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
 
    this.modalFormGroup = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      Password : new FormControl('', [Validators.required]),
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      MiddleName: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Mobile: new FormControl('', [Validators.required]),
      UserType: new FormControl('', [Validators.required]),
      Status: new FormControl('Active', [Validators.required]),
    } );

    this.modalFormGroup.patchValue(this.item);
  }

  onSubmit() {
 
    const request: any = {
    
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

    if (this.item == null){

      this.userService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + response.FullName + ".");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;

     
      this.userService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + response.FullName + ".");
          this.activeModal.close();
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

}
