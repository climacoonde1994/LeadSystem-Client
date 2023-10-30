import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { ClientService } from 'src/app/services/client.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})

export class ClientModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public countries : any[];
  public cities : any[];
  public filteredcities : any[];


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private countryService: CountryService,
    private cityService: CityService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }



  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      Code: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Description:  new FormControl('', [Validators.required]),
      Adress1:  new FormControl('', [Validators.required]),
      Adress2:  new FormControl(''),
      CountryId:  new FormControl(0,[Validators.required] ),
      CityId:  new FormControl( ),
      Phone:  new FormControl('',[Validators.required]),
      FAX:  new FormControl(''),
      URL:  new FormControl(''),
      
    }, { validator: WhiteSpace(['Code','Name']) }
    );

    this.modalFormGroup.patchValue(this.item);

    
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

    const request: any = {
      ClientId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      Description: this.modalForm.Description.value,
      Adress1: this.modalForm.Adress1.value,
      Adress2: this.modalForm.Adress2.value,
      CountryId: this.modalForm.CountryId.value,
      CityId: this.modalForm.CityId.value,
      Phone: this.modalForm.Phone.value,
      FAX: this.modalForm.FAX.value,
      URL: this.modalForm.URL.value,
    };

    if (this.item == null){

      this.clientService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + response.Name + " client.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;
      request.ClientId = this.item.ClientId;
 
      this.clientService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + response.Name + " client.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }

  }

  

  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onChange(){

    this.filteredcities = this.cities.filter(x => x.CountryId == this.modalForm.CountryId.value);
 
  }


}
