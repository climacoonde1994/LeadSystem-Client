import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { UserService } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public item: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private userService: UserService) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getById(params['id'])
        .subscribe(response => {
       
          this.item = response;
          console.log( this.item)
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.item = item;
  }

}
