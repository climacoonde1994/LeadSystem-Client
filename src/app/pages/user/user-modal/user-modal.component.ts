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

    this.roleService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
        this.roles = response.data;
      },
      error: error => {
        this.toastHelper.showError(error.error.message);
      }
    });

    this.modalFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required]),
    }, { validator: WhiteSpace(['firstName', 'lastName', 'emailAddress']) });

    this.modalFormGroup.patchValue(this.item);
  }

  onSubmit() {

    const request: any = {
      firstName: this.modalForm.firstName.value,
      lastName: this.modalForm.lastName.value,
      emailAddress: this.modalForm.emailAddress.value,
      mobileNumber: this.modalForm.mobileNumber.value,
      roleId: this.modalForm.roleId.value
    };

    if (this.item == null){

      this.userService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + response.data.fullName + ".");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.id = this.item.id;

      console.log(this.item);
      this.userService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + response.data.fullName + ".");
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
