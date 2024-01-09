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
import { MenuService } from 'src/app/services/menu.service';
import { PermissionService } from 'src/app/services/permission.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-usertype-detail',
  templateUrl: './usertype-detail.component.html',
  styleUrls: ['./usertype-detail.component.css']
})
export class UserTypeDetailComponent implements OnInit {

  public item: any;
  public userList : any[] = []
  public menupermissions: any[] = [];
  public activemenu: any[] = [];
  public usertypeid : string = "";

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private userService : UserService,
    private menuService : MenuService,
    private permissionService : PermissionService,
    private usertypeService: UserTypeService,
    private loadingService : LoadingService,
    private location: Location) { }

  ngOnInit() {

   
    this.loadItem();
  }

  loadItem() {

  


    this.activatedRoute.params.subscribe(params => {

      this.menuService.getList() 
      .pipe(first())
      .subscribe({
        next: response => {
        this.activemenu = response
      this.loadMenuDetails(params['id']);
        },
        error: response => {
          
        }
      }
      );

     
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
      for(var i = 0 ; i < this.userList.length ; i++)
      {
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


  mapMenu(list : any[] ){
 
    var menupermission: any[] = [];
    for(var x = 0 ;x < this.activemenu.length ; x++)
    {
     
        var Id = this.activemenu[x]._id
        var permission = list.filter(x => x.MenuId == Id);
     
        if(permission.length == 0)
        {
       
            var menu0 = 
            {
              Id : '',
              Name: this.activemenu[x].Name,
              MenuId : this.activemenu[x]._id,
              UserTypeId : this.usertypeid,
              View : false,
              Add: false,
              Edit: false,
              Delete:  false,
            }
            menupermission.push(menu0)
        }
       

    }

    for(var i = 0 ;i < list.length ; i++)
    {
      
        var menu = 
        {
          Id : list[i]._id,
          Name: this.activemenu.filter(x => x._id == list[i].MenuId)[0].Name,
          MenuId : list[i].MenuId,
          UserTypeId : list[i].UserTypeId,
          View :  list[i].View,
          Add: list[i].Add,
          Edit:  list[i].Edit,
          Delete:  list[i].Delete,
        }
        menupermission.push(menu)
    }
   
    return menupermission.sort((a, b) => a.Name.localeCompare(b.Name));;
  }

  savePermission(){

    this.loadingService.isLoading = true;
    this.permissionService.save(this.menupermissions)
    .pipe(first())
    .subscribe({
      next: response => {
        this.toastHelper.showSuccess("You have successfully update permissions.");
        this.loadingService.isLoading = false;
      },
      error: response => {
        this.toastHelper.showError(response);
        this.loadingService.isLoading = false;
      }
    });
  }

  fieldsChange(values:any, item : any,type : string):void {
    if(type == 'View')
    {
      item.View = values.target.checked
    }
    else if(type == 'Add')
    {
      item.Add = values.target.checked
    }
    else if(type == 'Edit')
    {
      item.Edit = values.target.checked
    }
    else if(type == 'Delete')
    {
      item.Delete = values.target.checked
    }
  }

  loadMenuDetails(params :any){

    this.usertypeService.getById(params )
    .subscribe(response => {
    this.item = response;
    this.usertypeid = params 
    this.loadAdditionalDetails()
    }, (error) => {
    this.toastHelper.showError(error.error.message);
    })

    this.permissionService.getByuserTypeId(params)
    .pipe(first())
    .subscribe({
    next: response => {

    this.menupermissions = this.mapMenu(response)

    },
    error: response => {

    }
    }
    );
  }


}
