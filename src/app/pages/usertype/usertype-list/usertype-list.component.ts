import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
 
import { UserTypeDeleteComponent } from '../usertype-delete/usertype-delete.component';
import { UserTypeModalComponent } from '../usertype-modal/usertype-modal.component';
import { UserTypeToggleComponent } from '../usertype-toggle/usertype-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { UserTypeDefaultComponent } from '../usertype-default/usertype-default.component';
import { LoadingService } from 'src/app/services/loader.service';
import { UserTypeService } from 'src/app/services/usertype.service';


@Component({
  selector: 'app-usertype-list',
  templateUrl: './usertype-list.component.html',
  styleUrls: ['./usertype-list.component.css']
})

export class UserTypeListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public usertypeService: UserTypeService, 
    private modalService: NgbModal, 
    private loadingService : LoadingService,

    private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.usertypeService.loadList();
    this.items = this.usertypeService.items;
    this.total = this.usertypeService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.usertypeService.sortColumn = column;
    this.usertypeService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => {     this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
