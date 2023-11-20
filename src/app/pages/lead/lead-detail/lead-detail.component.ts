import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadService } from 'src/app/services/lead.service';
import { LeadDeleteComponent } from '../lead-delete/lead-delete.component';
import { LeadClientModalComponent } from '../lead-client-modal/lead-client-modal.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeadContactModalComponent } from '../lead-contact-modal/lead-contact-modal.component';
import { LeadContactService } from 'src/app/services/lead-contact.service';
import { NoteService } from 'src/app/services/notes.service';
import { LeadDocumentModalComponent } from '../lead-document-modal/lead-document-modal.component';
import { LeadCutPasteModalComponent } from '../lead-cutpaste-modal/lead-cutpaste-modal.component';
import { CutPasteService } from 'src/app/services/cutpaste.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { DocumentService } from 'src/app/services/document.service';
import { ClientService } from 'src/app/services/client.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { SourceService } from 'src/app/services/source.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  public item: any;
  public cities: any[] = [];
  public countries: any[] = [];
  public employees: any[] = [];
  public specialties: any[] = [];
  public sources: any[] = [];
  public notes: any[] = [];
  public client : any = {};
 
  public salesperson1 : any = {};
  public salesperson2 : any = {};
  public city : any = {};
  public country : any = {};
  constructor(
    public router: Router,
    public cityService: CityService,
    public toastHelper: ToastHelper,
    public employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    public countryService: CountryService,
    public leadService: LeadService,
    public noteService : NoteService,
    public proposalService : ProposalService,
    public cutPasteService : CutPasteService,
    public documentService : DocumentService,
    public clientService : ClientService,
    public specialtyService : SpecialtyService,
    public sourceService : SourceService,
    private location: Location) { }

  ngOnInit() {
    this.loadItem();

    this.employeeService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.employees = response
     
      },
      error: response => {
        
      }
    }
    );

     

    this.sourceService.getList()
    .pipe(first())
    .subscribe({
      next: response => {

      this.sources = response
      
      
      },
      error: response => {
        
      }
    }
    );

    this.countryService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      
     
      },
      error: response => {
        
      }
    }
    );
    this.cityService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      
      },
      error: response => {
        
      }
    }
    );
   

    
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.leadService.getById(params['id'])
        .subscribe(response => {
          this.item = response;
          this.loadClient();
          if(this.item.SalesPersonId)
          {
            this.loadSalesPerson(1 , this.item.SalesPersonId);
          }
          if(this.item.SalesPersonId2)
          {
            this.loadSalesPerson(2 , this.item.SalesPersonId2);
          }
         
         
          this.loadLeadNotes();
         
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  loadClient(){

    this.clientService.getById(this.item.ClientId)
    .pipe(first())
    .subscribe({
      next: response => {
      this.client = response
     this.loadCity();
     this.loadCountry();

      
      },
      error: response => {
        
      }
    }
    );
  }

  loadCity(){
    this.cityService.getById(this.client.CityId)
    .pipe(first())
    .subscribe({
      next: response => {
      this.city = response
    
      },
      error: response => { 
      }
    }
    );
  }

  loadCountry(){
    this.cityService.getById(this.client.CountryId)
    .pipe(first())
    .subscribe({
      next: response => {
      this.country = response
    
      },
      error: response => { 
      }
    }
    );
  }

  loadSalesPerson(salesperson : number , id : any){

    this.employeeService.getById(id)
    .pipe(first())
    .subscribe({
      next: response => {
       if(salesperson == 1){
          this.salesperson1 = response
       }
       else{
        this.salesperson2 = response
       }
      
      },
      error: response => {
        
      }
    }
    );
  }

  loadLeadNotes(){
    this.noteService.getByLeadId(this.item.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
    
      this.notes = response
      console.log(this.notes)
      },
      error: response => {
        
      }
    }
    );
  }

 


  openModal(item?: any) {
    const modalRef = this.modalService.open(LeadClientModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
      );
  }

  openToggleModal(item?: any) {
  
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(LeadDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.router.navigate(['/lead-list']);
      }, (reason) => { }
    );
  }

  onBack() {
    this.location.back();
  }

 

}
