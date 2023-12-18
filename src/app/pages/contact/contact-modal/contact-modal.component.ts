import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { RoleService } from 'src/app/services/role.service';
import { ContactService } from 'src/app/services/contact.service';
import { WhiteSpace } from '../../../helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SystemTypeService } from 'src/app/services/systemtype.service';


@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})

export class ContactModalComponent implements OnInit {

  @Input() item: any;
  public roles: any[];
  public errors: any[];
  public modalFormGroup: FormGroup;
  public countries : any[];
  public cities : any[];
  public departments : any[];
  public filteredcities : any[];

  public salutations : any[] = [];
  public systemtypes : any[] = [];

  constructor(
 
    private countryService: CountryService,
    private cityService: CityService,
    private departmentService : DepartmentService,
    private systemTypeService : SystemTypeService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private roleService: RoleService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

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
      ContactId : 0,
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
console.log( this.modalForm.SystemType.value,)
    if (this.item == null)
    {
      this.item = request;
      this.contactService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully created " + response.FullName + ".");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }
    else {
      request.Id = this.item._id;
      this.contactService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully updated " + response.FullName + ".");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });
    }

    this.activeModal.close(this.item);

  }

  get modalForm() {
    return this.modalFormGroup.controls;
  }

  onDepartmentChange(event : any){
    var department = this.departments.filter(x => x.DepartmentId == event)[0];
    this.modalFormGroup.get('Department').setValue(department.Name);
  }

  onSystemTypechange(event : any){
    var systemtype = this.systemtypes.filter(x => x.SystemTypeId == event)[0];
    console.log(systemtype.Name)
    this.modalFormGroup.get('SystemType').setValue(systemtype.Name);
  }
}
