import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { ContactService } from 'src/app/services/contact.service';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { UserService } from 'src/app/services/user.service';
import { ContactToggleComponent } from '../contact-toggle/contact-toggle.component';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public ModuleName = "Contact";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  public item: any;
  public userList : any[] = []
  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private userService : UserService,
    private router: Router,
    private toastHelper: ToastHelper,
    private contactService: ContactService) { }

  ngOnInit() {
    this.loadItem();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.contactService.getById(params['id'])
        .subscribe(response => {
       
          this.item = response;
       this.loadAdditionalDetails();
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(ContactModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(ContactDeleteComponent);
    modalRef.componentInstance.item = item;
  }

  
  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(ContactToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadItem();
      }
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
