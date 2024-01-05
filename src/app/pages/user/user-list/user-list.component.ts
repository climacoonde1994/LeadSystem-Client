import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { UserService, } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UserToggleComponent } from '../user-toggle/user-toggle.component';
import { LoadingService } from 'src/app/services/loader.service';
import { UserResetComponent } from '../user-reset/user-reset.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  public ModuleName = "User";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public userService: UserService,
    private loadingService : LoadingService,
   private modalService: NgbModal) { }

  ngOnInit() {
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
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
        this.loadingService.isLoading = false
      }, (reason) => {  this.loadingService.isLoading = false}
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

  openResetModal(item?: any) {
    const modalRef = this.modalService.open(UserResetComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }
}
