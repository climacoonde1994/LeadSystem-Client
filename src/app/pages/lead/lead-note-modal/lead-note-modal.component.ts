import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common'
import { LoadingService } from 'src/app/services/loader.service';

 
 
@Component({
  selector: 'app-lead-note-modal',
  templateUrl: './lead-note-modal.component.html',
  styleUrls: ['./lead-note-modal.component.css']
})

export class LeadNoteModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];

  constructor(
    public formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private loadingService : LoadingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      NoteId : new FormControl(),
      LeadId : new FormControl(),
      Date: new FormControl((new Date()).toISOString().substring(0,10),[Validators.required]),
      Description:  new FormControl('', [Validators.required]),
     } 
    );
    this.modalFormGroup.get('Date').setValue((new Date()).toISOString().substring(0,10))
  }

  onSubmit() {

    this.loadingService.isLoading = true;
    const request: any = {
      NoteId : 0,
      LeadId : 0,
      Date: this.modalForm.Date.value,
      Description: this.modalForm.Description.value
    };
 
    this.activeModal.close(request);

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

}
