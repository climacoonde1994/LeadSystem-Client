import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { MenuService, } from 'src/app/services/menu.service';
import { MenuDeleteComponent } from '../menu-delete/menu-delete.component';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import { MenuToggleComponent } from '../menu-toggle/menu-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { MenuDefaultComponent } from '../menu-default/menu-default.component';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public menuService: MenuService, private loadingService : LoadingService,private modalService: NgbModal, private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.menuService.loadList();
    this.items = this.menuService.items;
    this.total = this.menuService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.menuService.sortColumn = column;
    this.menuService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(MenuModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => { this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(MenuToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
       
      }, (reason) => {  }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(MenuDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(MenuDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
