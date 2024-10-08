import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loader.service';

 
 
@Component({
  selector: 'app-lead-document-modal',
  templateUrl: './lead-document-modal.component.html',
  styleUrls: ['./lead-document-modal.component.css']
})

export class LeadDocumentModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public selectedFile: File = null;
  public selectedFileName: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService : LoadingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      DocumentId : new FormControl(),
      LeadId : new FormControl(),
      Date: new FormControl([Validators.required]),
      FileName:  new FormControl('', [Validators.required]),
      File:  new FormControl('', [Validators.required]),
     } 
    );

    this.modalFormGroup.get('Date').setValue((new Date()).toISOString().substring(0,10));

  }
  

  onSubmit() {
 
    this.loadingService.isLoading = true
    const request: any = {
      DocumentId : 0,
      LeadId : 0,
      Date: this.modalForm.Date.value,
      FileName: this.modalForm.FileName.value,
      File: this.selectedFile
    };
 
    this.activeModal.close(request);

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onFileSelected(event : any) {
    this.selectedFile = <File>event.target.files[0];
    this.modalFormGroup.get('FileName').setValue(this.selectedFile.name)
  }

}
