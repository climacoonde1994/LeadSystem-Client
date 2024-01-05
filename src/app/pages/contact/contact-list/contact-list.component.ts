import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { ContactService, } from 'src/app/services/contact.service';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { ContactToggleComponent } from '../contact-toggle/contact-toggle.component';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  public ModuleName = "Contact";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public contactService: ContactService,
    private loadingService : LoadingService,
   
     private modalService: NgbModal) { }

  ngOnInit() {
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    this.loadList();
  }

  loadList() {
    this.contactService.loadList('All');
    this.items = this.contactService.items;
    this.total = this.contactService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.contactService.sortColumn = column;
    this.contactService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(ContactModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => { this.loadingService.isLoading = false }
    );
  }


  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(ContactToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(ContactDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

}
