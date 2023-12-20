import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { LoadingService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-specialty-modal',
  templateUrl: './specialty-modal.component.html',
  styleUrls: ['./specialty-modal.component.css']
})





export class SpecialtyModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public categories : any[] = ["WEB" , "MOBILE" ,"DESKTOP" ,"OTHER" ];
  public user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private specialtyService: SpecialtyService,
    private toastHelper: ToastHelper,
    private loadingService : LoadingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user').toString())

    this.modalFormGroup = this.formBuilder.group({
      Code: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Description:  new FormControl('', [Validators.required]),
      Category:  new FormControl('',[Validators.required]),
    }, { validator: WhiteSpace(['Code','Name','Category']) }
    );

    this.modalFormGroup.patchValue(this.item);
  }

  onSubmit() {

    this.loadingService.isLoading = true
    const request: any = {
      SpecialtyId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      Category: this.modalForm.Category.value,
      Description: this.modalForm.Description.value,
      CreatedById  : "",
      UpdatedById  : ""
 
    };

    if (this.item == null){
      request.CreatedById = this.user._id
    
      this.specialtyService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + request.Name + " specialty under "+ response.Category);
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;
      request.SpecialtyId = this.item.SpecialtyId;
      request.UpdatedById = this.user._id
      this.specialtyService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + request.Name + " specialty under "+ response.Category);
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
