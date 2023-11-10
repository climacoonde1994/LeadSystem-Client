import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DocumentService } from 'src/app/services/document.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.css']
})

export class DocumentModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description:  new FormControl('', [Validators.required]),
    }, { validator: WhiteSpace(['code','name']) }
    );

    this.modalFormGroup.patchValue(this.item);
  }

  onSubmit() {

    const request: any = {
      code: this.modalForm.code.value,
      name: this.modalForm.name.value,
      description: this.modalForm.description.value
    };

    if (this.item == null){

      
    }
    else {

      request.id = this.item.id;
  
    }

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

}


