import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { EmployeeService } from 'src/app/services/employee.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})

export class EmployeeModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public countries : any[];
  public cities : any[];
  public departments : any[];
  public filteredcities : any[];

  public suffixes : any[];



  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private cityService: CityService,
    private toastHelper: ToastHelper,
    private departmentService : DepartmentService,
    public activeModal: NgbActiveModal) {

      
     }



  ngOnInit() {


    
    this.modalFormGroup = this.formBuilder.group({
      EmployeeId: new FormControl(0),
      FirstName: new FormControl('', [Validators.required]),
      MiddleName:  new FormControl( ),
      LastName:  new FormControl('', [Validators.required]),
      Suffix:  new FormControl(),
      Position:  new FormControl('', [Validators.required]),
      DepartmentId:  new FormControl('', [Validators.required]),
      Adress1:  new FormControl('', [Validators.required]),
      Adress2:  new FormControl(''),
      CityId:  new FormControl( ),
      CountryId:  new FormControl(0,[Validators.required] ),
      Phone:  new FormControl('',[Validators.required]),
      Email:  new FormControl(''), 
    }
    );

    this.modalFormGroup.patchValue(this.item);

  
    this.departmentService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.departments = response
     
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

    this.suffixes.push({Suffix : 'Sr.'})
      this.suffixes.push({Suffix : 'Jr.'})
      this.suffixes.push({Suffix : 'III'})
      this.suffixes.push({Suffix : 'IV'})
      this.suffixes.push({Suffix : 'V'})

      console.log(this.suffixes)

  }
 
  onSubmit() {
 

    const request: any = {
      EmployeeId : 0,
      FirstName: this.modalForm.FirstName.value,
      MiddleName: this.modalForm.MiddleName.value,
      LastName: this.modalForm.LastName.value,
      Suffix: this.modalForm.Suffix.value,
      Position: this.modalForm.Position.value,
      DepartmentId: this.modalForm.DepartmentId.value,
      Adress1: this.modalForm.Adress1.value,
      Adress2: this.modalForm.Adress2.value,
      CountryId: this.modalForm.CountryId.value,
      CityId: this.modalForm.CityId.value,
      Phone: this.modalForm.Phone.value,
      Email: this.modalForm.Email.value,
 
    };

    if (this.item == null){

      this.employeeService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + response.Name + " employee.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {

      request.Id = this.item._id;
      request.EmployeeId = this.item.EmployeeId;
 
      this.employeeService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + response.Name + " employee.");
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

   
  getsuffix(){

    this.suffixes.push({Suffix : 'Sr.'})
    this.suffixes.push({Suffix : 'Jr.'})
    this.suffixes.push({Suffix : 'III'})
    this.suffixes.push({Suffix : 'IV'})
    this.suffixes.push({Suffix : 'V'})
  }


}
