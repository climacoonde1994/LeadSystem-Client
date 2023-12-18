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
import { ClientService } from 'src/app/services/client.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { SourceService } from 'src/app/services/source.service';
import { Specialty } from 'src/app/interfaces/specialty';



@Component({
  selector: 'app-lead-update',
  templateUrl: './lead-update.component.html',
  styleUrls: ['./lead-update.component.css']
})
export class LeadUpdateComponent implements OnInit {

  @Input() item: any;


  private user : any = {};
  public clientName : string = "";
  public clientDescription : string = "";
  public leadNumber : string = "";

  public actionNeeded : boolean = false
  public webchecked : boolean = false
  public mobilechecked : boolean = false
  public desktopchecked : boolean = false
  public otherchecked : boolean = false 
  public mode : boolean = true;
  public LeadId : string = '';

  public selectedCity : any;
  public selectedCountry : any;
  public cities: any[] = [];
  public countries: any[] = [];
  public employees: any[] = [];
  public specialties: any[] = [];
  public sources: any[] = [];

  public selectedspecialties: any[] = [];

  public webspecialties: any[] = [];
  public mobilespecialties: any[] = [];
  public desktopspecialties: any[] = [];
  public otherspecialties: any[] = [];

  public notes: any[] = [];
  public leadcontacts: any[] = [];
  public documents: any[] = [];
  public proposals: any[] = [];
  public cutpastes: any[] = [];
  public selectedFile: File = null;

  public LeadHeader : any = {};
 
 
 
  public errors: any[];
  public modalFormGroup: FormGroup;
  public selectedVendorId: any;
  public hideDocument = true;
  public hideExport = true;

  constructor(
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    public cityService: CityService,
    public toastHelper: ToastHelper,
    public countryService: CountryService,
    public employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,
    public leadService : LeadService,
    public leadContactService : LeadContactService,
    public noteService : NoteService,
    public proposalService : ProposalService,
    public cutPasteService : CutPasteService,
    public documentService : DocumentService,
    public clientService : ClientService,
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
      Specialty : new FormControl(),
      ActionNeeded : new FormControl(''),
      MeetDate : new FormControl(''),
      BestTimeCall : new FormControl(''),
      Remarks : new FormControl(''),
      InternetContactList : new FormControl(''),
      ActionNeededNotes : new FormControl( ),
      InternetNotes : new FormControl(''),
    });

    this.LeadId = this.activatedRoute.snapshot.paramMap.get('id');
  
    
    this.user = JSON.parse(localStorage.getItem('user').toString())
 
 
    this.employeeService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.employees = response
      }
    }
    );

  

    this.sourceService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.sources = response
      }
    }
    );

    this.countryService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.countries = response
        }
      }
    );

    this.cityService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.cities = response
        } 
      }
    );

    this.specialtyService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
 
      this.specialties = this.mapSpecialty(response)
      
      this.webspecialties = this.specialties.filter(x => x.Category == 'WEB')
      this.mobilespecialties = this.specialties.filter(x => x.Category == 'MOBILE')
      this.desktopspecialties = this.specialties.filter(x => x.Category == 'DESKTOP')
      this.otherspecialties = this.specialties.filter(x => x.Category == 'OTHER')
      this.setCategoryCheck()
      },
      error: response => {
        
      }
    }
    );
 

    this.leadService.getById(this.LeadId)
      .pipe(first())
      .subscribe({
        next: data => {
          this.leadNumber = data.LeadNo
          this.modalFormGroup.get('LeadId').setValue(data.LeadId);
          this.modalFormGroup.get('ClientId').setValue(data.ClientId);
          this.modalFormGroup.get('LeadNo').setValue(data.LeadNo);
          this.modalFormGroup.get('Description').setValue(data.Description);
          this.modalFormGroup.get('LeadDate').setValue(data.LeadDate);
          this.modalFormGroup.get('Status').setValue(data.Status);
          this.modalFormGroup.get('StatusComment').setValue(data.StatusComment);
          this.modalFormGroup.get('SalesPersonId').setValue(data.SalesPersonId);
          this.modalFormGroup.get('FollowUpDate').setValue(data.FollowUpDate);
          this.modalFormGroup.get('SalesPersonId2').setValue(data.SalesPersonId2);
          this.modalFormGroup.get('FollowUpDate2').setValue(data.FollowUpDate2);
          this.modalFormGroup.get('SourceId').setValue(data.SourceId);
          this.modalFormGroup.get('Quality').setValue(data.Quality);
          this.modalFormGroup.get('Likelihood').setValue(data.Likelihood);
          this.modalFormGroup.get('Comments').setValue(data.Comments);
          this.modalFormGroup.get('ActionNeeded').setValue(data.ActionNeeded);
          this.modalFormGroup.get('MeetDate').setValue(data.MeetDate);
          this.modalFormGroup.get('BestTimeCall').setValue(data.BestTimeCall);
          this.modalFormGroup.get('Remarks').setValue(data.Remarks);
          this.modalFormGroup.get('InternetContactList').setValue(data.InternetContactList);
          this.modalFormGroup.get('ActionNeededNotes').setValue(data.ActionNeededNotes);
          this.modalFormGroup.get('InternetNotes').setValue(data.InternetNotes);
          this.selectedspecialties = data.Specialty      
          this.getLeaderDetails()
        },
        error: response => {
          this.errors = response.errors;
        }
      });

    
     

    

  }

 

  saveLeadheader( ) {
    const request: any = {
      LeadId :this.modalForm.LeadId.value,
      LeadDate :this.modalForm.LeadDate.value,
      Status :this.modalForm.Status.value,
      Description:this.modalForm.Description.value,
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
      BestTimeCall :this.modalForm.BestTimeCall.value,
      Remarks :this.modalForm.Remarks.value,
      InternetContactList :this.modalForm.InternetContactList.value,
      ActionNeededNotes :this.modalForm.ActionNeededNotes.value,
      InternetNotes :this.modalForm.InternetNotes.value,
      Specialty :this.selectedspecialties,
    };

    this.leadService.update(request)
    .pipe(first())
    .subscribe({
      next: response => {
        this.toastHelper.showSuccess("You have successfully updated " + response.LeadId + " Lead.");
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
    
      this.leadContactService.update(this.leadcontacts)
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
   
     this.proposalService.update(this.proposals)
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
 
   this.noteService.update(this.notes)
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
 
   this.cutPasteService.update(this.cutpastes)
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

   
}


  openClientModal()
  {
 
    const modalRef = this.modalService.open(LeadClientModalComponent ,{size: 'xl' });
    modalRef.result.then(
      (data: any) => {
        this.selectedCity = this.cities.filter(x => x.CityId == data.CityId)[0];
        this.selectedCountry = this.countries.filter(x => x.CountryId == data.CountryId)[0]
        this.modalFormGroup.get('ClientName').setValue(data.Name);
        
        this.modalFormGroup.get('Address1').setValue(data.Address1);
        this.modalFormGroup.get('Address2').setValue(data.Address2);
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
    const modalRef = this.modalService.open(LeadContactModalComponent,{size: 'xl' });
    modalRef.result.then(
      (data: any) => {
        if(data.LastName.length > 0 && data.FirstName.length > 0 && data.LastName && data.FirstName )
        {
          data.LeadId = this.LeadId;
          var leadcontacts : any[] = []
          leadcontacts.push(data)
          this.leadContactService.create(leadcontacts)
          .pipe(first())
          .subscribe({
            next: response => {
              this.leadcontacts.push(data)
            },
            error: response => {
              this.errors = response.errors;
            }
          });
        }
  
      }, (reason) => { }
    );
    
  }




  openNotesModal()
  {
 
    const modalRef = this.modalService.open(LeadNoteModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.Description && data.Description.length > 0  )
        { 
          data.LeadId = this.LeadId;
          data.Author = this.user.FullName;
          var notes : any[] = []
          notes.push(data)
          this.noteService.create(notes)
          .pipe(first())
          .subscribe({
            next: response => {
              this.notes.push(data)
            },
            error: response => {
              this.errors = response.errors;
            }
          });
          
        }
      
    
      }, (reason) => { }
    );
     
  }

  openProposalModal()
  {
 
    const modalRef = this.modalService.open(LeadProposalModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.Proposal && data.Proposal.length > 0  )
        {
            if(this.isProporalExist(data.Proposal))
            {
              return;
            }



          data.LeadId = this.LeadId;
          var proposals : any[] = []
          proposals.push(data)
          this.proposalService.create(proposals)
          .pipe(first())
          .subscribe({
            next: response => {
            
              this.proposals.push(data)
            },
            error: response => {
              this.errors = response.errors;
            }
          });
        }
      }, (reason) => { }
    );
     
  }

  openDocumentModal()
  {
 
    const modalRef = this.modalService.open(LeadDocumentModalComponent ,{size: 'lg' });
    modalRef.result.then(
      (data: any) => {
        if(data.FileName && data.FileName.length > 0  )
        {
          this.selectedFile = <File>data.File
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        
    
        this.documentService.create(formData,this.selectedFile.name,this.selectedFile.type.split('/')[1] , this.selectedFile.type.split('/')[0] , this.LeadId)
        .pipe(first())
        .subscribe({
          next:response => {
           data._id = response._id
            this.documents.push(data)
          }

        } );
          
        }
      }, (reason) => { }
    );
     
  }

  
  openCutPasteModal(item : any)
  {
 
    const modalRef = this.modalService.open(LeadCutPasteModalComponent ,{size: 'lg' });
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        if(data.Description && data.Description.length > 0  )
        {
          data.LeadId = this.LeadId;
          var cutpastes : any[] = []
          cutpastes.push(data)
          this.cutPasteService.create(cutpastes)
          .pipe(first())
          .subscribe({
            next: response => {
              this.cutpastes.push(data)
            },
            error: response => {
              this.errors = response.errors;
            }
          });
      
        }
      }, (reason) => { }
    );
     
  }

  deleteContact(index: any , id:any) {
    this.leadContactService.delete(id)
    .pipe(first())
    .subscribe({
      next: response => {
        this.leadcontacts.splice(index,1)
      },
      error: response => {
        this.errors = response.errors;
      }
    });
   
  
  }

  deleteProposal(index: any) {
    this.proposals.splice(index,1)
   }

 

   
   downloadDocument(file : any) {
 
    this.documentService.downloadById(file._id).subscribe(data => {
      const blob = new Blob([data], { type: file.Prefix +'/'+ file.FileType});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.FileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
   
  }

  setStatus(data : any){
    const request: any = {
      LeadId :this.modalForm.LeadId.value,
      LeadDate :this.modalForm.LeadDate.value,
      Status :data,
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
      BestTimeCall :this.modalForm.BestTimeCall.value,
      Remarks :this.modalForm.Remarks.value,
      InternetContactList :this.modalForm.InternetContactList.value,
      ActionNeededNotes :this.modalForm.ActionNeededNotes.value,
      InternetNotes :this.modalForm.InternetNotes.value,
    };

    this.leadService.update(request)
    .pipe(first())
    .subscribe({
      next: response => {
        this.modalFormGroup.get('Status').setValue(data);
        this.toastHelper.showSuccess("You have successfully set Lead as " + data );
      },
      error: response => {
        this.errors = response.errors;
      }
    });

  }
 

  checkValue(data : any){
    alert(data)
  }

  isProporalExist(data: any)
  {
    for(var i = 0 ; i < this.proposals.length ; i++)
    {
      if(this.proposals[i].Proposal == data){
        return true;
      }
    
    }
    return false;
  }



 


  get modalForm() {
    return this.modalFormGroup.controls;
  }

  mapSpecialty(list : any ){

 
    var specialties: any[] = [];
    for(var i = 0 ;i < list.length ; i++)
    {
        var specialty = { Name: list[i].Name,
        Select: this.selectedspecialties.includes(list[i].SpecialtyId),  
        SpecialtyId: list[i].SpecialtyId,
        Category: list[i].Category}
        specialties.push(specialty)
    }
    
    return specialties;
  }

  fieldsChange(values:any, item : any):void {
    item.Select = values.target.checked
    if(values.target.checked)
    {
      this.selectedspecialties.push(item.SpecialtyId)
    }
    else
    {
      const index = this.selectedspecialties.indexOf(item.SpecialtyId);
      if (index > -1) 
      {
        this.selectedspecialties.splice(index, 1);
      }
    }

    this.setCategoryCheck();
  }
  actionNeededChange(values:any ):void {
    this.modalFormGroup.get('ActionNeeded').setValue(values.target.checked);
  }
  
 
  setCategoryCheck(){
     
    this.webchecked = this.webspecialties.filter(x => x.Select == true).length > 0;
    this.mobilechecked = this.mobilespecialties.filter(x => x.Select == true).length > 0;
    this.desktopchecked = this.desktopspecialties.filter(x => x.Select == true).length > 0;
    this.otherchecked = this.otherspecialties.filter(x => x.Select == true).length > 0;
 
    
  }

  getLeaderDetails(){
    this.leadContactService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
      this.leadcontacts = response
      },
      error: response => {
        
      }
    }
    );

    this.noteService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
      this.notes = response
      },
      error: response => {
        
      }
    }
    );

    this.proposalService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
       
      this.proposals = response
      },
      error: response => {
        
      }
    }
    );

    this.documentService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
       
      this.documents = response
      },
      error: response => {
        
      }
    }
    );

    this.cutPasteService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: response => {
       
      this.cutpastes = response
      },
      error: response => {
        
      }
    }
    );

    this.clientService.getByLeadId(this.LeadId)
    .pipe(first())
    .subscribe({
      next: data => {

        this.selectedCity = this.cities.filter(x => x.CityId == data.CityId)[0];
        this.selectedCountry = this.countries.filter(x => x.CountryId == data.CountryId)[0]
        this.modalFormGroup.get('ClientName').setValue(data.Name);
   
        this.modalFormGroup.get('Address1').setValue(data.Address1);
        this.modalFormGroup.get('Address2').setValue(data.Address2);
        this.modalFormGroup.get('City').setValue(this.selectedCity.Name);
        this.modalFormGroup.get('ZIP').setValue(this.selectedCity.ZIP);
        this.modalFormGroup.get('Country').setValue(this.selectedCountry.Name);
        this.modalFormGroup.get('Phone').setValue(data.Phone);
        this.modalFormGroup.get('FAX').setValue(data.FAX);
        this.modalFormGroup.get('URL').setValue(data.URL);
        this.modalFormGroup.get('ClientId').setValue(data.ClientId);
        this.clientName = data.Name
        this.clientDescription = data.Description
   
      },
      error: response => {
        this.errors = response.errors;
      }
    });

  }
}
