import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { DepartmentService, } from 'src/app/services/department.service';
import { DepartmentDeleteComponent } from '../department-delete/department-delete.component';
import { DepartmentModalComponent } from '../department-modal/department-modal.component';
import { DepartmentToggleComponent } from '../department-toggle/department-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { DepartmentDefaultComponent } from '../department-default/department-default.component';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

 

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public departmentService: DepartmentService, 

    private modalService: NgbModal, private loadingService : LoadingService,private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.departmentService.loadList();
    this.items = this.departmentService.items;
    this.total = this.departmentService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.departmentService.sortColumn = column;
    this.departmentService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(DepartmentModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false;
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(DepartmentToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(DepartmentDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(DepartmentDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

}
