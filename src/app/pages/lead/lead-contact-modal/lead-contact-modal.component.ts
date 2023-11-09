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
import { SystemTypeService } from 'src/app/services/systemtype.service';

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
  public countries : any[];
  public cities : any[];
  public departments : any[];
  public filteredcities : any[];

  public salutations : any[] = [];
  public systemtypes : any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private cityService: CityService,
    private toastHelper: ToastHelper,
    private departmentService : DepartmentService,
    private systemTypeService : SystemTypeService,
    public activeModal: NgbActiveModal) {

      
     }



  ngOnInit() {


    
    this.modalFormGroup = this.formBuilder.group({
      LeadContactId: new FormControl(0),
      Salutation:  new FormControl(),
      FirstName: new FormControl('', [Validators.required]),
      LastName:  new FormControl('', [Validators.required]),
      Status:  new FormControl('' ),
      Department:  new FormControl('' ),
      SystemType:  new FormControl('' ),
      DepartmentId:  new FormControl('' ),
      SystemTypeId:  new FormControl('' ),
      Email:  new FormControl(''), 
      Remarks:  new FormControl(''),
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

    this.systemTypeService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.systemtypes = response
     
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

    this.salutations.push({Suffix : 'Mr.'})
      this.salutations.push({Salutations : 'Mrs.'})
      this.salutations.push({Salutations : 'Ms.'})
      this.salutations.push({Salutations : 'Engr.'})
      this.salutations.push({Salutations : 'Dr.'})
      this.salutations.push({Salutations : 'Gen.'})
      this.salutations.push({Salutations : 'Sen.'})
      this.salutations.push({Salutations : 'Mayor'})
      this.salutations.push({Salutations : 'Sir'})
      this.salutations.push({Salutations : 'Maam'})

  }
 
  onSubmit() {
 
 
    const request: any = {
      LeadContactId : 0,
      Salutation: this.modalForm.Salutation.value,
      FirstName: this.modalForm.FirstName.value,
      LastName: this.modalForm.LastName.value,
      Status: this.modalForm.Status.value,
      Department: this.modalForm.Department.value,
      DepartmentId: this.modalForm.DepartmentId.value,
      SystemType: this.modalForm.SystemType.value,
      SystemTypeId: this.modalForm.SystemTypeId.value,
      Email: this.modalForm.Email.value,
      Remarks: this.modalForm.Remarks.value,
 
    };

     this.item = request;
    this.activeModal.close(this.item);
  }

  

  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onDepartmentChange(event : any){
    var department = this.departments.filter(x => x.DepartmentId == event)[0];
    this.modalFormGroup.get('Department').setValue(department.Name);
  }

  onSystemTypehange(event : any){
    var systemtype = this.systemtypes.filter(x => x.SystemTypeId == event)[0];
    this.modalFormGroup.get('SystemType').setValue(systemtype.Name);

  }
   
  

}
