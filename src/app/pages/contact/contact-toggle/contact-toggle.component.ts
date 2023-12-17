import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-toggle',
  templateUrl: './contact-toggle.component.html',
  styleUrls: ['./contact-toggle.component.css']
})

export class ContactToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private contactService: ContactService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.contactService.toggle(this.item.id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.data.isEnabled ? "enabled" : "disabled") + " " + this.item.fullName + " contact.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

