import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-toggle',
  templateUrl: './role-toggle.component.html',
  styleUrls: ['./role-toggle.component.css']
})

export class RoleToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private roleService: RoleService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.roleService.toggle(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.data.isEnabled ? "enabled" : "disabled") + " " + this.item.name + " role.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

