import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { CountryService, } from 'src/app/services/country.service';
import { CountryDeleteComponent } from '../country-delete/country-delete.component';
import { CountryModalComponent } from '../country-modal/country-modal.component';
import { CountryToggleComponent } from '../country-toggle/country-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { CountryDefaultComponent } from '../country-default/country-default.component';
import { LoadingService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {

  public ModuleName = "Country";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;
 
  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public countryService: CountryService, 
    private loadingService: LoadingService,
    private modalService: NgbModal, 
    private router : Router,
    private toastHelper: ToastHelper) { }

  ngOnInit() {
    this.loadList();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadList() {
    this.countryService.loadList();
    this.items = this.countryService.items;
    this.total = this.countryService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.countryService.sortColumn = column;
    this.countryService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(CountryModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadingService.isLoading = false;
        this.loadList();
      }, (reason) => {  this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(CountryToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(CountryDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(CountryDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
