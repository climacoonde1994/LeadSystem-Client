import { DatePipe, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { LeadClientModalComponent } from '../lead-client-modal/lead-client-modal.component';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { LeadNoteModalComponent } from '../lead-note-modal/lead-note-modal.component';
import { LeadProposalModalComponent } from '../lead-proposal-modal/lead-proposal-modal.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeadContactModalComponent } from '../lead-contact-modal/lead-contact-modal.component';
import { LeadService } from 'src/app/services/lead.service';
import { LeadContactService } from 'src/app/services/lead-contact.service';
import { NoteService } from 'src/app/services/notes.service';
import { LeadDocumentModalComponent } from '../lead-document-modal/lead-document-modal.component';
import { LeadCutPasteModalComponent } from '../lead-cutpaste-modal/lead-cutpaste-modal.component';
import { CutPasteService } from 'src/app/services/cutpaste.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { DocumentService } from 'src/app/services/document.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { SourceService } from 'src/app/services/source.service';



@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {

  @Input() item: any;

  public mode : boolean = true

  public selectedCity : any;
  public selectedCountry : any;
  public cities: any[] = [];
  public countries: any[] = [];
  public employees: any[] = [];
  public specialties: any[] = [];
  public sources: any[] = [];

  public notes: any[] = [];
  public leadcontacts: any[] = [];
  public documents: any[] = [];
  public proposals: any[] = [];
  public cutpastes: any[] = [];
  public selectedFile: File = null;

 
 
 
  public errors: any[];
  public modalFormGroup: FormGroup;
  public selectedVendorId: any;
  public hideDocument = true;
  public hideExport = true;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cityService: CityService,
    private datepipe: DatePipe,
    private toastHelper: ToastHelper,
    private countryService: CountryService,
    private employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,
    public leadService : LeadService,
    public leadContactService : LeadContactService,
    public noteService : NoteService,
    public proposalService : ProposalService,
    public cutPasteService : CutPasteService,
    public documentService : DocumentService,
    public specialtyService : SpecialtyService,
    public sourceService : SourceService
    
   ) { }

  ngOnInit() { 

    this.modalFormGroup = this.formBuilder.group({
      LeadHeaderId :   new FormControl(''),
      ClientId: new FormControl(''),
      ClientName: new FormControl(''),
      Description: new FormControl(''),
      Address1: new FormControl(''),
      Address2: new FormControl(''),
      City: new FormControl(''),
      Country: new FormControl(''),
      ZIP: new FormControl(''),
      FAX: new FormControl(''),
      Phone: new FormControl(''),
      URL : new FormControl(''),
      LeadId : new FormControl(''),
      LeadNo : new FormControl(''),
      LeadDate : new FormControl(''),
      Status : new FormControl(''),
      StatusComment : new FormControl(''),
      SalesPersonId : new FormControl(''),
      FollowUpDate : new FormControl(''),
      SalesPersonId2 : new FormControl(''),
      FollowUpDate2 : new FormControl(''),
      SourceId : new FormControl(''),
      Quality : new FormControl(''),
      Likelihood : new FormControl(''),
      Comments : new FormControl(''),
      ActionNeeded : new FormControl(''),
      MeetDate : new FormControl(''),
      Remarks : new FormControl(''),
      InternetContactList : new FormControl(''),
      ActionNeededNotes : new FormControl(''),
      InternetNotes : new FormControl(''),
    });


    
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

    this.countryService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.countries = response
     
      },
      error: response => {
        
      }
    }
    );
    this.cityService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.cities = response
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

 
  }

  onSubmit() {
    const request: any = {
      LeadId :this.modalForm.LeadId.value,
      LeadNo :this.modalForm.LeadNo.value,
      LeadDate :this.modalForm.LeadDate.value,
      ClientId:this.modalForm.ClientId.value,
      ClientName:this.modalForm.ClientName.value,
      Description:this.modalForm.Description.value,
      Address1:this.modalForm.Address1.value,
      Address2:this.modalForm.Address2.value,
      City:this.modalForm.City.value,
      Country:this.modalForm.Country.value,
      ZIP:this.modalForm.ZIP.value,
      FAX:this.modalForm.FAX.value,
      Phone:this.modalForm.Phone.value,
      URL :this.modalForm.URL.value,
      Status :this.modalForm.Status.value,
      StatusComment :this.modalForm.StatusComment.value,
      SalesPersonId :this.modalForm.SalesPersonId.value,
      FollowUpDate :this.modalForm.FollowUpDate.value,
      SalesPersonId2 :this.modalForm.SalesPersonId2.value,
      FollowUpDate2 :this.modalForm.FollowUpDate2.value,
      SourceId :this.modalForm.SourceId.value,
      Quality :this.modalForm.Quality.value,
      Likelihood :this.modalForm.Likelihood.value,
      Comments :this.modalForm.Comments.value,
      ActionNeeded :this.modalForm.ActionNeeded.value,
      MeetDate :this.modalForm.MeetDate.value,
      Remarks :this.modalForm.Remarks.value,
      InternetContactList :this.modalForm.InternetContactList.value,
      ActionNeededNotes :this.modalForm.ActionNeededNotes.value,
      InternetNotes :this.modalForm.InternetNotes.value,
 
    };
   
   
 
 
  }

  saveLeadheader( ) {

    if(this.validateLeadForm())
    {
      
      return ;
    }
    const request: any = {
   
      LeadId :this.modalForm.LeadId.value,
      LeadNo :this.modalForm.LeadNo.value,
      LeadDate :this.modalForm.LeadDate.value,
      ClientId:this.modalForm.ClientId.value,
      ClientName:this.modalForm.ClientName.value,
      Description:this.modalForm.Description.value,
      Address1:this.modalForm.Address1.value,
      Address2:this.modalForm.Address2.value,
      City:this.modalForm.City.value,
      Country:this.modalForm.Country.value,
      ZIP:this.modalForm.ZIP.value,
      FAX:this.modalForm.FAX.value,
      Phone:this.modalForm.Phone.value,
      URL :this.modalForm.URL.value,
      Status :this.modalForm.Status.value,
      StatusComment :this.modalForm.StatusComment.value,
      SalesPersonId :this.modalForm.SalesPersonId.value,
      FollowUpDate :this.modalForm.FollowUpDate.value,
      SalesPersonId2 :this.modalForm.SalesPersonId2.value,
      FollowUpDate2 :this.modalForm.FollowUpDate2.value,
      SourceId :this.modalForm.SourceId.value,
      Quality :this.modalForm.Quality.value,
      Likelihood :this.modalForm.Likelihood.value,
      Comments :this.modalForm.Comments.value,
      ActionNeeded :this.modalForm.ActionNeeded.value,
      MeetDate :this.modalForm.MeetDate.value,
      Remarks :this.modalForm.Remarks.value,
      InternetContactList :this.modalForm.InternetContactList.value,
      ActionNeededNotes :this.modalForm.ActionNeededNotes.value,
      InternetNotes :this.modalForm.InternetNotes.value,
    
    };

   
   
  
    this.leadService.create(request)
    .pipe(first())
    .subscribe({
      next: response => {
          this.saveLeadContact(response.LeadId);
          this.saveLeadNotes(response.LeadId);
        this.saveLeadProposals(response.LeadId);
        this.saveLeadCutPastes(response.LeadId);
        this.saveLeadDocuments(response.LeadId);
        this.toastHelper.showSuccess("You have successfully created " + response.LeadId + " Lead.");
      },
      error: response => {
        this.errors = response.errors;
      }
    });

  
  }

  saveLeadContact(leadId : any){

     if(this.leadcontacts.length > 0 ){

      for(var i = 0 ; i <  this.leadcontacts.length ; i++)
      {
        this.leadcontacts[i].LeadId = leadId;
      }
    
      this.leadContactService.create(this.leadcontacts)
      .pipe(first())
      .subscribe({
        next: response => {
        
        },
        error: response => {
          this.errors = response.errors;
        }
      });
     }

    
  }


  saveLeadNotes(leadId : any){

    if(this.proposals.length > 0 ){

     for(var i = 0 ; i <  this.proposals.length ; i++)
     {
       this.proposals[i].LeadId = leadId;
     }
   
     this.proposalService.create(this.proposals)
     .pipe(first())
     .subscribe({
       next: response => {
       
       },
       error: response => {
         this.errors = response.errors;
       }
     });
    }
 }

 saveLeadProposals(leadId : any){

  if(this.notes.length > 0 ){

   for(var i = 0 ; i <  this.notes.length ; i++)
   {
     this.notes[i].LeadId = leadId;
   }
 
   this.noteService.create(this.notes)
   .pipe(first())
   .subscribe({
     next: response => {
     
     },
     error: response => {
       this.errors = response.errors;
     }
   });
  }
}

saveLeadCutPastes(leadId : any){

  if(this.cutpastes.length > 0 ){

   for(var i = 0 ; i <  this.cutpastes.length ; i++)
   {
     this.cutpastes[i].LeadId = leadId;
   }
 
   this.cutPasteService.create(this.cutpastes)
   .pipe(first())
   .subscribe({
     next: response => {
     
     },
     error: response => {
       this.errors = response.errors;
     }
   });
  }
}

saveLeadDocuments(leadId : any){

  if(this.documents.length > 0 )
  {

   for(var i = 0 ; i <  this.documents.length ; i++)
   {
    this.selectedFile = <File>this.documents[i].File
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    
       

     this.documentService.create(formData,this.selectedFile.name,this.selectedFile.type.split('/')[1] , this.selectedFile.type.split('/')[0] , leadId)
     .pipe(first())
     .subscribe( );
   }
 
 
  }
}


  openClientModal()
  {
 
    const modalRef = this.modalService.open(LeadClientModalComponent ,{size: 'xl' });
    modalRef.result.then(
      (data: any) => {
        this.selectedCity = this.cities.filter(x => x.CityId == data.CityId)[0];
        this.selectedCountry = this.countries.filter(x => x.CountryId == data.CountryId)[0]
        this.modalFormGroup.get('ClientName').setValue(data.Name);
        this.modalFormGroup.get('Description').setValue(data.Description);
        this.modalFormGroup.get('Address1').setValue(data.Adress1);
        this.modalFormGroup.get('Address2').setValue(data.Adress2);
        this.modalFormGroup.get('City').setValue(this.selectedCity.Name);
        this.modalFormGroup.get('ZIP').setValue(this.selectedCity.ZIP);
        this.modalFormGroup.get('Country').setValue(this.selectedCountry.Name);
        this.modalFormGroup.get('Phone').setValue(data.Phone);
        this.modalFormGroup.get('FAX').setValue(data.FAX);
        this.modalFormGroup.get('URL').setValue(data.URL);
        this.modalFormGroup.get('ClientId').setValue(data.ClientId);
      }, (reason) => { }
    );
     
  }


  openLeadContactModal(item?: any) {
    const modalRef = this.modalService.open(LeadContactModalComponent);
    modalRef.result.then(
      (data: any) => {
        if(data.LastName.length > 0 && data.FirstName.length > 0 )
        {
          this.leadcontacts.push(data)
        }
  
      }, (reason) => { }
    );
    
  }




  openNotesModal()
  {
 
    const modalRef = this.modalService.open(LeadNoteModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.Date.length > 0  )
        {
          this.notes.push(data)
        }
      
    
      }, (reason) => { }
    );
     
  }

  openProposalModal()
  {
 
    const modalRef = this.modalService.open(LeadProposalModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.Proposal.length > 0  )
        {
          this.proposals.push(data)
        }
      }, (reason) => { }
    );
     
  }

  openDocumentModal()
  {
 
    const modalRef = this.modalService.open(LeadDocumentModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.FileName.length > 0  )
        {
          this.documents.push(data)
        }
      }, (reason) => { }
    );
     
  }

  
  openCutPasteModal()
  {
 
    const modalRef = this.modalService.open(LeadCutPasteModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.Description.length > 0  )
        {
          this.cutpastes.push(data)
        }
      }, (reason) => { }
    );
     
  }

  deleteContact(index: any) {
   this.leadcontacts.splice(index,1)
  }

  deleteProposal(index: any) {
    this.proposals.splice(index,1)
   }

   deleteDocument(index: any) {
    this.documents.splice(index,1)
   }


 


  get modalForm() {
    return this.modalFormGroup.controls;
  }


  validateLeadForm(){
    this.errors = [];
    if(this.checkEmptyStringNull(this.modalForm.LeadDate.value)){
      this.errors.push('Lead Date is required');
    }
    if(this.checkEmptyStringNull(this.modalForm.ClientId.value)){
      this.errors.push('Client is required');
    }
    if(this.checkEmptyStringNull(this.modalForm.Status.value)){
      this.errors.push('Status is required');
    }
    if(this.checkEmptyStringNull(this.modalForm.StatusComment.value)){
      this.errors.push('Status Comment is required');
    }
    if(this.checkEmptyStringNull(this.modalForm.SalesPersonId.value)){
      this.errors.push('SalesPerson is required');
    }
    if(this.checkEmptyStringNull(this.modalForm.FollowUpDate.value)){
      this.errors.push('FollowUp Date  is required');
    }

    return this.errors.length > 0;
    
  }

  checkEmptyStringNull(data : any)
  { 
    return  data == '' || data == null
  }
 



 
 
}
