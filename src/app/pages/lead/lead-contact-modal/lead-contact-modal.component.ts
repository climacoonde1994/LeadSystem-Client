import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { EmployeeService } from 'src/app/services/employee.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SystemTypeService } from 'src/app/services/systemtype.service';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';

@Component({
  selector: 'app-lead-contact-modal',
  templateUrl: './lead-contact-modal.component.html',
  styleUrls: ['./lead-contact-modal.component.css']
})

export class LeadContactModalComponent implements OnInit {
  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public total: Observable<number>;
  public items: Observable<any[]>;
  public countries : any[];
  public cities : any[];
  public departments : any[];
  public filteredcities : any[];
  public salutations : any[] = [];
  public systemtypes : any[] = [];
  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(
    public contactService : ContactService,
    public activeModal: NgbActiveModal) {

      
     }



  ngOnInit() {
  this.loadList();
  }

  loadList() {
    this.contactService.loadList('Active');
    this.items = this.contactService.items;
    this.total = this.contactService.total;
  }

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.contactService.sortColumn = column;
    this.contactService.sortDirection = direction;

    

  }

  
  rowSelect(data :any){
    this.item = data;
    this.activeModal.close(this.item);
  }
}