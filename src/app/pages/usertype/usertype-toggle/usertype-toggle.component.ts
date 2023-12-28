import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { UserTypeService } from 'src/app/services/usertype.service';

@Component({
  selector: 'app-usertype-toggle',
  templateUrl: './usertype-toggle.component.html',
  styleUrls: ['./usertype-toggle.component.css']
})

export class UserTypeToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private usertypeService: UserTypeService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.usertypeService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " usertype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

