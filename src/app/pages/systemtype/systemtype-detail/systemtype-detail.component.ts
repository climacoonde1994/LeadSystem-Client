import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemTypeService } from 'src/app/services/systemtype.service';
import { SystemTypeDeleteComponent } from '../systemtype-delete/systemtype-delete.component';
import { SystemTypeModalComponent } from '../systemtype-modal/systemtype-modal.component';
import { SystemTypeToggleComponent } from '../systemtype-toggle/systemtype-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { SystemTypeDefaultComponent } from '../systemtype-default/systemtype-default.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-systemtype-detail',
  templateUrl: './systemtype-detail.component.html',
  styleUrls: ['./systemtype-detail.component.css']
})
export class SystemTypeDetailComponent implements OnInit {
  public ModuleName = "System Type";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  public item: any;
  public userList : any[] = []

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private userService : UserService,
    private systemtypeService: SystemTypeService,
    private location: Location) { }

  ngOnInit() { 
    this.loadItem();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.systemtypeService.getById(params['id'])
        .subscribe(response => {
          this.item = response;
          this.loadAdditionalDetails()
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
      );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.router.navigate(['/systemtype-list']);
      }, (reason) => { }
    );
  }

  onBack() {
    this.location.back();
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(SystemTypeDefaultComponent);
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
