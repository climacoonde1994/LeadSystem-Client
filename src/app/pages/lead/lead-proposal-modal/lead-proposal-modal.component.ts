import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loader.service';

 
 
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
    private loadingService : LoadingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      LeadId : new FormControl(),
      ProposalId: new FormControl(),
      Radio1: new FormControl(),
      Radio2: new FormControl(),
      Radio3: new FormControl(),
      Radio4: new FormControl(),
    } 
    );

 
  }

  onSubmit() {

    this.loadingService.isLoading = true
    const request: any = {
      LeadId : 0,
      ProposalId: 0,
      Proposal: this.modalForm.Radio1.value ?? this.modalForm.Radio2.value ?? this.modalForm.Radio3.value  ??this.modalForm.Radio4.value,
    };
    
     this.activeModal.close(request);
  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
