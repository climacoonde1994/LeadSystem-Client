import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-toggle',
  templateUrl: './document-toggle.component.html',
  styleUrls: ['./document-toggle.component.css']
})

export class DocumentToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private documentService: DocumentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.documentService.toggle(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.data.isEnabled ? "enabled" : "disabled") + " " + this.item.name + " document.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

