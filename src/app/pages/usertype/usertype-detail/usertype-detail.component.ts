import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
import { UserTypeDeleteComponent } from '../usertype-delete/usertype-delete.component';
import { UserTypeModalComponent } from '../usertype-modal/usertype-modal.component';
import { UserTypeToggleComponent } from '../usertype-toggle/usertype-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { UserTypeDefaultComponent } from '../usertype-default/usertype-default.component';
import { UserService } from 'src/app/services/user.service';
import { UserTypeService } from 'src/app/services/usertype.service';

@Component({
  selector: 'app-usertype-detail',
  templateUrl: './usertype-detail.component.html',
  styleUrls: ['./usertype-detail.component.css']
})
export class UserTypeDetailComponent implements OnInit {

  public item: any;
  public userList : any[] = []

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private userService : UserService,
    private usertypeService: UserTypeService,
    private location: Location) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.usertypeService.getById(params['id'])
        .subscribe(response => {
          this.item = response;
          this.loadAdditionalDetails()
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
      );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.router.navigate(['/usertype-list']);
      }, (reason) => { }
    );
  }

  onBack() {
    this.location.back();
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(UserTypeDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  
  loadAdditionalDetails(){
    this.userService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.userList = response
      console.log(this.item)
      for(var i = 0 ; i < this.userList.length ; i++)
      {
       console.log( this.userList[i]._id , this.item.CreatedById)
        if(this.userList[i]._id == this.item.CreatedById)
        {
          this.item.CreatedBy = this.userList[i].FullName;
        }
        if(this.userList[i]._id == this.item.UpdatedById)
        {
          this.item.UpdatedBy = this.userList[i].FullName;
        }
      }
      },
      error: response => {
        
      }
      }
    );
  }



}
