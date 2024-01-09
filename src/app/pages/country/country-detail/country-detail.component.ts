import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from 'src/app/services/country.service';
import { CountryDeleteComponent } from '../country-delete/country-delete.component';
import { CountryModalComponent } from '../country-modal/country-modal.component';
import { CountryToggleComponent } from '../country-toggle/country-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { CountryDefaultComponent } from '../country-default/country-default.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  public ModuleName = "Country";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  public item: any;
  public userList : any[] = []

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private userService : UserService,
    private toastHelper: ToastHelper,
    private countryService: CountryService,
    private location: Location) { }

  ngOnInit() {
    this.loadItem();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.countryService.getById(params['id'])
        .subscribe(response => {
          this.item = response;
          this.loadAdditionalDetails();
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(CountryModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
      );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(CountryToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(CountryDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.router.navigate(['/country-list']);
      }, (reason) => { }
    );
  }

  onBack() {
    this.location.back();
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(CountryDefaultComponent);
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
