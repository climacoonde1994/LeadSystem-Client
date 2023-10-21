import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-lead-toggle',
  templateUrl: './lead-toggle.component.html',
  styleUrls: ['./lead-toggle.component.css']
})

export class LeadToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private leadService: LeadService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.leadService.toggle(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.data.isEnabled ? "enabled" : "disabled") + " " + this.item.name + " lead.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

