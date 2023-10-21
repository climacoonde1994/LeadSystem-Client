import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-default',
  templateUrl: './document-default.component.html',
  styleUrls: ['./document-default.component.css']
})

export class DocumentDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private documentService: DocumentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.documentService.default(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.data.isDefault ? "set" : "unset") + " " + response.data.name + "  as default document.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

