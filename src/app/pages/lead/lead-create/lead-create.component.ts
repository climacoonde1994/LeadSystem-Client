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



@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {

  @Input() item: any;

  
  public purchaseOrderTypes: any[] = [];
  public documents: any[] = [];
  public exportLicenses: any[] = [];
  public salesDepartments: any[] = [];
  public tradeTerms: any[] = [];
  public paymentTerms: any[] = [];
  public customers: any[] = [];
  public endUsers: any[] = [];
  public booleanTypes: any[] = [];
  public priceTypes: any[] = [];
  public vendorReference: any[] = [];
  public vendors: any[] = [];
  public vendorContacts: any[] = [];
  public purchaseOrderDetails: any[] = [];
  public PoDetails: any = {};
  public errors: any[];
  public modalFormGroup: FormGroup;
  public selectedVendorId: any;
  public hideDocument = true;
  public hideExport = true;

  constructor(
    private formBuilder: FormBuilder,

    private datepipe: DatePipe,
    public activatedRoute: ActivatedRoute
 
   ) { }

  ngOnInit() { 

    this.modalFormGroup = this.formBuilder.group({
      id: new FormControl('' ),
      revNo: new FormControl('', [Validators.required]),
      purchaseOrderTypeId: new FormControl('', [Validators.required]),
      exportLicenseId: new FormControl('', [Validators.required]),
      exportLicenseOthers: new FormControl(''),
      salesDepartmentId: new FormControl('', [Validators.required]),
      documentId: new FormControl('', [Validators.required]),
      documentOthers: new FormControl(''),
      vendorId: new FormControl('', [Validators.required]),
      vendorContactId: new FormControl('', [Validators.required]),
      vendorReferenceNo: new FormControl('', [Validators.required]),
      oANo: new FormControl('', [Validators.required]),
      tradeTermId: new FormControl('', [Validators.required]),
      paymentTermId: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      customerReferenceNo: new FormControl('', [Validators.required]),
      consignee: new FormControl('', [Validators.required]),
      endUserId: new FormControl('', [Validators.required]),
    });
    
  
    
    
 
 
  }

  onSubmit() {


    console.log(this.modalForm)
    const requestdetails: any[] = this.purchaseOrderDetails;


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
      purchaseOrderDetails: requestdetails
     
    
    };
   
   
    // this.purchaseOrderService.create(request)
    //   .pipe(first())
    //   .subscribe({
    //     next: response => {
    //       this.toastHelper.showSuccess("You have successfully created " + response.data.id + " purchase order..");
    //       this.router.navigate(["/purchase-order-update/" + response.data.id]);
    //     },
    //     error: response => {
    //       this.toastHelper.showError("Has error");
    //       this.errors = response.errors;
    //     }
    //   });
 
  }

  openSalesContactModal(id?: number) {

    //const modalRef = this.modalService.open(SelectSalesContactModalComponent);

   
    // if (id > 0){
    //   const item: any = {
    //     id: id,
    //     salesSectionId: this.modalForm.salesSectionId.value,
    //   }
    //   modalRef.componentInstance.item = item;
    // }
   
    // modalRef.result.then(
    //   (data: any) => {
        
    //   }, (reason) => { }
    // );
  }


  openAddressModal(id?: number , type? : any) {

    // const modalRef = this.modalService.open(AddressModalComponent);
    // if (id > 0) {
    //   const item: any = {
    //     id: id
    //   }
    //   modalRef.componentInstance.item = item;
    // }

    // modalRef.result.then(
    //   (data: any) => {

    //     if (type == 'S') {
    //       this.modalForm.shippingAddressId.patchValue(data.id);
    //       this.modalForm.shippingAddress.patchValue(data.address1 + ', ' + data.address2);
    //     }
    //     if (type == 'B') {
    //       this.modalForm.billingAddressId.patchValue(data.id);
    //       this.modalForm.billingAddress.patchValue(data.address1 + ', ' + data.address2);
    //     }

         
    //   }, (reason) => { }
    // );
  }

  
  


  

  addDetails() {
    
     
  }

  removeDetails(index: any) {
    this.purchaseOrderDetails.splice(index,1)

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

    this.purchaseOrderDetails = [];
    if (itemlist.length > 0) {  
      for (let i = 0; i < itemlist.length; i++)
      {
        this.PoDetails = {
          purchaseOrderDetailId: i + 1,
          partNumber: itemlist[i].partNo,
          description: itemlist[i].description1,
          deliveryDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
          quantity: 0,
          price: 0
        }
        this.purchaseOrderDetails.push(this.PoDetails);
      }
      
    }

  }

  onChange($event: any, othersfield: any, itemlist: any) {

   let name = itemlist.filter((x: { id: string; }) => x.id == $event)[0].name as string;

    const control = this.modalForm[othersfield];
    if (name.includes('Other'))
    {
      this.hideElements(othersfield,false)
      control.addValidators(Validators.required)
 
    }
    else {
      control.clearValidators();
      control.setValue('');
      this.hideElements(othersfield, true)
   ;
   
    
    }
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
