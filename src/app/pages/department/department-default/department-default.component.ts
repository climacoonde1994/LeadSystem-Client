import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-default',
  templateUrl: './department-default.component.html',
  styleUrls: ['./department-default.component.css']
})

export class DepartmentDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private departmentService: DepartmentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.departmentService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default department.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

