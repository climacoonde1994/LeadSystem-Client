import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { CityService } from 'src/app/services/city.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-city-modal',
  templateUrl: './city-modal.component.html',
  styleUrls: ['./city-modal.component.css']
})

export class CityModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public countries : any[];
  public user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private loadingService : LoadingService,
    private toastHelper: ToastHelper,
    private countryService: CountryService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user').toString())
    this.modalFormGroup = this.formBuilder.group({
      CityId: new FormControl(0),
      Code: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Description:  new FormControl(''),
      CountryId:  new FormControl('', [Validators.required]),
      ZIP: new FormControl('', [Validators.required]),
   
    }, { validator: WhiteSpace(['Code','Name']) }
    );

    this.modalFormGroup.patchValue(this.item);

    this.countryService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.countries = response
      var defaultCountry = this.countries.filter(x => x.Default == true)[0]
      if(defaultCountry != null && defaultCountry != null)
      {
        this.modalFormGroup.get('CountryId').setValue( defaultCountry.CountryId);
      }
     
      },
      error: response => {
        
      }
    }
    );

  }

  onSubmit() {
    this.loadingService.isLoading = true
    const request: any = {
      CityId : 0,
      Code: this.modalForm.Code.value,
      Name: this.modalForm.Name.value,
      ZIP: this.modalForm.ZIP.value,
      Description: this.modalForm.Description.value,
      CountryId: this.modalForm.CountryId.value,
      CreatedById  : "",
      UpdatedById  : ""
      
    };

    if (this.item == null){
      request.CreatedById = this.user._id
      this.cityService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully created " + request.Name + " city.");
            this.activeModal.close();
          }
          else{
            this.errors = response.message
            this.loadingService.isLoading = false;
          }
 
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;
      request.CityId = this.item.CityId;
      request.UpdatedById = this.user._id
      this.cityService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully updated " + request.Name + " city.");
            this.activeModal.close();
          }
          else{
            this.errors = response.message
            this.loadingService.isLoading = false;
          }
        
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

}
