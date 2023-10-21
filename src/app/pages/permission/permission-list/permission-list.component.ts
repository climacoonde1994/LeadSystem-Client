import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { PermissionService, } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})

export class PermissionListComponent implements OnInit {

  public id: string;
  public items: Observable<any[]>;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public activatedRoute: ActivatedRoute,
              public permissionService: PermissionService,
              private toastHelper: ToastHelper,
              private modalService: NgbModal) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loadList();
  }

  loadList() {
    this.permissionService.loadList(this.id);
    this.items = this.permissionService.items;
    this.total = this.permissionService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.permissionService.sortColumn = column;
    this.permissionService.sortDirection = direction;

  }

  onChange(roleId: string, item: any) {
    item.isChecked = !item.isChecked;
    console.log(item.isChecked);
    this.permissionService.toggle(roleId, item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          if (!item.isChecked){
            this.toastHelper.showSuccess("You have successfully added " + item.name + " permission to this role.");
          }
          else {
            this.toastHelper.showSuccess("You have successfully removed " + item.name + " permission to this role.");
          }
          this.loadList();
        },
        error: error => {
          this.toastHelper.showError("An error occured while setting permission. Please try again later.");
        }
      });
  }

}
