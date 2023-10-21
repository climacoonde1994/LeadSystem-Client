import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { RoleService } from 'src/app/services/role.service';
import { RoleDeleteComponent } from '../role-delete/role-delete.component';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  public item: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private roleService: RoleService) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.roleService.getById(params['id'])
        .subscribe(response => {
          this.item = response.data;
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(RoleModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(RoleDeleteComponent);
    modalRef.componentInstance.item = item;
  }

}
