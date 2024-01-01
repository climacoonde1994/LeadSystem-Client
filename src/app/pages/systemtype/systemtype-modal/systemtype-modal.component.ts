import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SystemTypeService } from 'src/app/services/systemtype.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-systemtype-modal',
  templateUrl: './systemtype-modal.component.html',
  styleUrls: ['./systemtype-modal.component.css']
})

export class SystemTypeModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public user: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private systemtypeService: SystemTypeService,
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
      SystemTypeId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      Description: this.modalForm.Description.value,
      CreatedById  : "",
      UpdatedById  : ""
    };

    if (this.item == null){

      request.CreatedById = this.user._id
  
      this.systemtypeService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully created " + request.Name + " system type.");
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
      request.SystemTypeId = this.item.SystemTypeId;
      request.UpdatedById = this.user._id
      this.systemtypeService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully updated " + request.Name + " system type.");
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

}
