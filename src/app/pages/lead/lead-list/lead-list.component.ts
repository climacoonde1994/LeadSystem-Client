import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { LeadService, } from 'src/app/services/lead.service';
import { LeadDeleteComponent } from '../lead-delete/lead-delete.component';
import { LeadClientModalComponent } from '../lead-client-modal/lead-client-modal.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
 

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})

export class LeadListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public leadService: LeadService, private modalService: NgbModal, private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.leadService.loadList();
    this.items = this.leadService.items;
    this.total = this.leadService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.leadService.sortColumn = column;
    this.leadService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(LeadClientModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
   
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(LeadDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    
  }
   

}
