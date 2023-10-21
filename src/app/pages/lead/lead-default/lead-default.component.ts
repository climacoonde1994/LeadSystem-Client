import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-lead-default',
  templateUrl: './lead-default.component.html',
  styleUrls: ['./lead-default.component.css']
})

export class LeadDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private leadService: LeadService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.leadService.default(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.data.isDefault ? "set" : "unset") + " " + response.data.name + "  as default lead.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

