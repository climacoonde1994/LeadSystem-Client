import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
 
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { LoadingService } from 'src/app/services/loader.service';
import { UserTypeService } from 'src/app/services/usertype.service';

@Component({
  selector: 'app-usertype-modal',
  templateUrl: './usertype-modal.component.html',
  styleUrls: ['./usertype-modal.component.css']
})

export class UserTypeModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public user: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private usertypeService: UserTypeService,
    private toastHelper: ToastHelper,
    private loadingService : LoadingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user').toString())
    this.modalFormGroup = this.formBuilder.group({
      Code: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Description:  new FormControl('', [Validators.required]),
    }, { validator: WhiteSpace(['Code','Name']) }
    );

    this.modalFormGroup.patchValue(this.item);
  }

  onSubmit() {
    this.loadingService.isLoading = true
    const request: any = {
      UserTypeId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      Description: this.modalForm.Description.value,
      CreatedById  : "",
      UpdatedById  : ""
    };

    if (this.item == null){

      request.CreatedById = this.user._id
  
      this.usertypeService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + request.Name + " usertype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;
      request.UserTypeId = this.item.UserTypeId;
      request.UpdatedById = this.user._id
      this.usertypeService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + request.Name + " usertype.");
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
