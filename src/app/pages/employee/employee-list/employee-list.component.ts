import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { EmployeeService, } from 'src/app/services/employee.service';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { EmployeeToggleComponent } from '../employee-toggle/employee-toggle.component';
import { LoadingService } from 'src/app/services/loader.service';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  public ModuleName = "Employee";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;



  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public employeeService: EmployeeService,
              private router: Router,
              private loadingService : LoadingService,
              private modalService: NgbModal, 
              private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadList() {
    this.employeeService.loadList();
    this.items = this.employeeService.items;
    this.total = this.employeeService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.employeeService.sortColumn = column;
    this.employeeService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => {     this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(EmployeeToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(EmployeeDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
 

}
