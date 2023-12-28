import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-toggle',
  templateUrl: './user-toggle.component.html',
  styleUrls: ['./user-toggle.component.css']
})

export class UserToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private userService: UserService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.userService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          console.log(response)
          this.toastHelper.showSuccess("You have successfully " + (!this.item.Enabled ? "enabled" : "disabled") + " " + this.item.FullName + " user.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

