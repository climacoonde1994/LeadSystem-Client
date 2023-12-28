import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { UserTypeService } from 'src/app/services/usertype.service';

@Component({
  selector: 'app-usertype-default',
  templateUrl: './usertype-default.component.html',
  styleUrls: ['./usertype-default.component.css']
})

export class UserTypeDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private usertypeService: UserTypeService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.usertypeService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default usertype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

