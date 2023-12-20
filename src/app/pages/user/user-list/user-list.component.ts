import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { UserService, } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UserToggleComponent } from '../user-toggle/user-toggle.component';
import { LoadingService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public userService: UserService,
    private loadingService : LoadingService,
   private modalService: NgbModal) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.userService.loadList();
    this.items = this.userService.items;
    this.total = this.userService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.userService.sortColumn = column;
    this.userService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = true
      }, (reason) => { }
    );
  }


  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(UserToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

}
