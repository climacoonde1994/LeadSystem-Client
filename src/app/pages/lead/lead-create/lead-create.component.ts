import { DatePipe, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { BooleanType } from 'src/app/variables/boolean-type.enum';
import { PriceType } from 'src/app/variables/price-type.enum';
import { DocumentService } from '../../../services/document.service';
 
import { VendorReference } from '../../../variables/vendor-reference.enum';
import { ClientModalComponent } from '../../client/client-modal/client-modal.component';
import { LeadClientModalComponent } from '../lead-client-modal/lead-client-modal.component';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';



@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {

  @Input() item: any;

  public selectedCity : any;
  public selectedCountry : any;

  
  public cities: any[] = [];
  public countries: any[] = [];
  public exportLicenses: any[] = [];
  public salesDepartments: any[] = [];
  public tradeTerms: any[] = [];
  public paymentTerms: any[] = [];
  public customers: any[] = [];
  public endUsers: any[] = [];
  public booleanTypes: any[] = [];
  public priceTypes: any[] = [];
  public vendorReference: any[] = [];
 
  public PoDetails: any = {};
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
    public activatedRoute: ActivatedRoute
 
   ) { }

  ngOnInit() { 

    this.modalFormGroup = this.formBuilder.group({
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
 
  }

  onSubmit() {


    console.log(this.modalForm)
 


    const request: any = {
   
      id: 0,
      revNo: this.modalForm.revNo.value,
      purchaseOrderTypeId: this.modalForm.purchaseOrderTypeId.value,
      exportLicenseId: this.modalForm.exportLicenseId.value,
      salesDepartmentId: this.modalForm.salesDepartmentId.value,
      documentId: this.modalForm.documentId.value,
      vendorId: this.modalForm.vendorId.value,
      vendorContactId: this.modalForm.vendorContactId.value,
      vendorReferenceNo: this.modalForm.vendorReferenceNo.value,
      oANo: this.modalForm.oANo.value,
      tradeTermId: this.modalForm.tradeTermId.value,
      paymentTermId: this.modalForm.paymentTermId.value,
      customerId: this.modalForm.customerId.value,
      customerReferenceNo: this.modalForm.customerReferenceNo.value,
      consignee: this.modalForm.consignee.value,
      endUserId: this.modalForm.endUserId.value,
      documentOthers: this.modalForm.documentOthers.value,
      exportLicenseOthers: this.modalForm.exportLicenseOthers.value,
 
    
    };
   
   
 
 
  }

  openSalesContactModal(id?: number) {

  
  }


  openAddressModal(id?: number , type? : any) {
 
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


  
  


  

  addDetails() {
    
     
  }

  removeDetails(index: any) {
 
  }

 

  openModal(item?: any, i?: any) {
  
     
  }


  get modalForm() {
    return this.modalFormGroup.controls;
  }

  getDefaultId(Itemlist: any) {
    return Itemlist.filter((x: { isDefault: boolean; }) => x.isDefault)[0] != null ? Itemlist.filter((x: { isDefault: boolean; }) => x.isDefault)[0].id : ''
  }

  setDefaultItems(itemlist: any[]) {

    
   

  }

 
  hideElements(field: string, hidden: boolean) {

    if (field == 'exportLicenseOthers') {
      this.hideExport = hidden
    }
    if (field == 'documentOthers') {
      this.hideDocument = hidden;
    }
  }

 
 
}
