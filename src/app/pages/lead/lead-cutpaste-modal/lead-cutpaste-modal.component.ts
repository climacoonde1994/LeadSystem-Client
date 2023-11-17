import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastHelper } from 'src/app/helpers/toast.helper';
 
 
@Component({
  selector: 'app-lead-cutpaste-modal',
  templateUrl: './lead-cutpaste-modal.component.html',
  styleUrls: ['./lead-cutpaste-modal.component.css']
})

export class LeadCutPasteModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      CutPasteId : new FormControl(),
      LeadId : new FormControl(),
      Date: new FormControl('',[Validators.required]),
      Title: new FormControl('',[Validators.required]),
      Description:  new FormControl('', [Validators.required]),
     } 
    );

    if(this.item)
    {
      this.modalFormGroup.patchValue(this.item);
      this.modalFormGroup.get('Date').setValue((new Date(this.item.Date)).toISOString().substring(0,10));
    }
    else
    {
      this.modalFormGroup.get('Date').setValue((new Date()).toISOString().substring(0,10));

    }
   
  }

  onSubmit() {

    const request: any = {
      CutPasteId : 0,
      LeadId : 0,
      Date: this.modalForm.Date.value,
      Title: this.modalForm.Title.value,
      Description: this.modalForm.Description.value
    };
 
    this.activeModal.close(request);

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
