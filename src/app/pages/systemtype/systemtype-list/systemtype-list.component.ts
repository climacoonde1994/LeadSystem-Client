import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { SystemTypeService, } from 'src/app/services/systemtype.service';
import { SystemTypeDeleteComponent } from '../systemtype-delete/systemtype-delete.component';
import { SystemTypeModalComponent } from '../systemtype-modal/systemtype-modal.component';
import { SystemTypeToggleComponent } from '../systemtype-toggle/systemtype-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { SystemTypeDefaultComponent } from '../systemtype-default/systemtype-default.component';
import { LoadingService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-systemtype-list',
  templateUrl: './systemtype-list.component.html',
  styleUrls: ['./systemtype-list.component.css']
})

export class SystemTypeListComponent implements OnInit {

  public ModuleName = "System Type";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public systemtypeService: SystemTypeService, 
    private modalService: NgbModal, 
    private router: Router,
    private loadingService : LoadingService,
    private toastHelper: ToastHelper) { }

  ngOnInit() { 
    this.loadList();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadList() {
    this.systemtypeService.loadList();
    this.items = this.systemtypeService.items;
    this.total = this.systemtypeService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.systemtypeService.sortColumn = column;
    this.systemtypeService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => {     this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
