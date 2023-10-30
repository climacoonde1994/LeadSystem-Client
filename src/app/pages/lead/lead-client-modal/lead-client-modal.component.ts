import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { LeadService } from 'src/app/services/lead.service';
 
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-client-modal.component.html',
  styleUrls: ['./lead-client-modal.component.css']
})



export class LeadClientModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public total: Observable<number>;
  public items: Observable<any[]>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(
    private formBuilder: FormBuilder,
    private leadService: LeadService,
    private toastHelper: ToastHelper,
    public clientService: ClientService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.loadList();
    
  }

  loadList() {
    this.clientService.loadList();
    this.items = this.clientService.items;
    this.total = this.clientService.total;
  }
  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.clientService.sortColumn = column;
    this.clientService.sortDirection = direction;

  }

  rowSelect(data :any){
    this.item = data;
    this.activeModal.close(this.item);
 
  }


}
