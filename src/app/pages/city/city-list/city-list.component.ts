import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { CityService, } from 'src/app/services/city.service';
import { CityDeleteComponent } from '../city-delete/city-delete.component';
import { CityModalComponent } from '../city-modal/city-modal.component';
import { CityToggleComponent } from '../city-toggle/city-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { CityDefaultComponent } from '../city-default/city-default.component';
import { LoadingService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})

export class CityListComponent implements OnInit {

  public ModuleName = "City";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());
  
  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public cityService: CityService, 
    private loadingService : LoadingService,
    private modalService: NgbModal, 
    private router: Router ) { }

  ngOnInit() {
    this.loadList();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  
  }

  loadList() {
    this.cityService.loadList();
    this.items = this.cityService.items;
    this.total = this.cityService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.cityService.sortColumn = column;
    this.cityService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(CityModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => { this.loadingService.isLoading = false}
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(CityToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
       
      }, (reason) => {  }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(CityDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(CityDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
