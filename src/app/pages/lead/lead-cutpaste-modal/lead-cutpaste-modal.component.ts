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

    this.modalFormGroup.patchValue(this.item);

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
