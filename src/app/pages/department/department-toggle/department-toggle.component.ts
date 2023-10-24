import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-toggle',
  templateUrl: './department-toggle.component.html',
  styleUrls: ['./department-toggle.component.css']
})

export class DepartmentToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private departmentService: DepartmentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.departmentService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " department.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

