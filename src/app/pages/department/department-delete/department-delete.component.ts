import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-delete',
  templateUrl: './department-delete.component.html',
  styleUrls: ['./department-delete.component.css']
})

export class DepartmentDeleteComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.departmentService.delete(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully deleted " + response.data.name + " department.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

