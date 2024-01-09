import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { SourceService, } from 'src/app/services/source.service';
import { SourceDeleteComponent } from '../source-delete/source-delete.component';
import { SourceModalComponent } from '../source-modal/source-modal.component';
import { SourceToggleComponent } from '../source-toggle/source-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { SourceDefaultComponent } from '../source-default/source-default.component';
import { LoadingService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css']
})

export class SourceListComponent implements OnInit {
  public ModuleName = "Source";
  public ModulePermission : any= {};
  public permissions: any[] = JSON.parse(localStorage.getItem('permissions').toString());

  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;
  public closeResult: string;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public sourceService: SourceService,
    private router: Router,
     private modalService: NgbModal, 
     private loadingService : LoadingService,
     private toastHelper: ToastHelper) { }

  ngOnInit() { 
    this.loadList();
    this.ModulePermission = this.permissions.find(x => x.Name == this.ModuleName); 
    if(!this.ModulePermission.View)  
      this.router.navigate(['/401']);
  }

  loadList() {
    
    this.sourceService.loadList();
    this.items = this.sourceService.items;
    this.total = this.sourceService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sourceService.sortColumn = column;
    this.sourceService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(SourceModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
        this.loadingService.isLoading = false
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(SourceToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => {     this.loadingService.isLoading = false}
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(SourceDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(SourceDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }
   

}
