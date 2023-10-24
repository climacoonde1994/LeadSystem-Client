import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { SpecialtyService, } from 'src/app/services/specialty.service';
import { SpecialtyDeleteComponent } from '../specialty-delete/specialty-delete.component';
import { SpecialtyModalComponent } from '../specialty-modal/specialty-modal.component';
import { SpecialtyToggleComponent } from '../specialty-toggle/specialty-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { SpecialtyDefaultComponent } from '../specialty-default/specialty-default.component';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})

export class SpecialtyListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public specialtyService: SpecialtyService, private modalService: NgbModal, private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.specialtyService.loadList();
    this.items = this.specialtyService.items;
    this.total = this.specialtyService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.specialtyService.sortColumn = column;
    this.specialtyService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
