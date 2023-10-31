import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastHelper } from 'src/app/helpers/toast.helper';
 
 
@Component({
  selector: 'app-lead-proposal-modal',
  templateUrl: './lead-proposal-modal.component.html',
  styleUrls: ['./lead-proposal-modal.component.css']
})

export class LeadProposalModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      Id : new FormControl(),
      Proposal: new FormControl()
    } 
    );

 
  }

  onSubmit() {

    const request: any = {
      Id : 0,
      Date: this.modalForm.Date.value,
      Description: this.modalForm.Description.value
    };
 
    this.activeModal.close(request);

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
