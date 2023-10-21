import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { RoleService, } from 'src/app/services/role.service';
import { RoleDeleteComponent } from '../role-delete/role-delete.component';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { RoleToggleComponent } from '../role-toggle/role-toggle.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

export class RoleListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public roleService: RoleService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.roleService.loadList();
    this.items = this.roleService.items;
    this.total = this.roleService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.roleService.sortColumn = column;
    this.roleService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(RoleModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }


  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(RoleToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(RoleDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

}
