import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { ClientService, } from 'src/app/services/client.service';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { ClientToggleComponent } from '../client-toggle/client-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})

export class ClientListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;


  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public clientService: ClientService,  private loadingService : LoadingService, private modalService: NgbModal, private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.clientService.loadList('All');
    this.items = this.clientService.items;
    this.total = this.clientService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.clientService.sortColumn = column;
    this.clientService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(ClientModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => {    this.loadingService.isLoading = false }
    );

  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(ClientToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(ClientDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
 

}
