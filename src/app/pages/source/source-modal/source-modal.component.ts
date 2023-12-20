import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SourceService } from 'src/app/services/source.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';

@Component({
  selector: 'app-source-modal',
  templateUrl: './source-modal.component.html',
  styleUrls: ['./source-modal.component.css']
})

export class SourceModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public user: any = {};
  
  constructor(
    private formBuilder: FormBuilder,
    private sourceService: SourceService,
    private toastHelper: ToastHelper,
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

    const request: any = {
      SourceId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      Description: this.modalForm.Description.value,
      CreatedById  : "",
      UpdatedById  : ""
      
    };

    if (this.item == null){
      request.CreatedById = this.user._id
      this.sourceService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + request.Name + " source.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {
      request.Id = this.item._id;
      request.SourceId = this.item.SourceId;
      request.UpdatedById = this.user._id
      this.sourceService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + request.Name + " source.");
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
