import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { ClientService } from 'src/app/services/client.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';

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

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }



  ngOnInit() {

    this.modalFormGroup = this.formBuilder.group({
      Code: new FormControl('C1', [Validators.required]),
      Name: new FormControl('SHONGOLOLER', [Validators.required]),
      Description:  new FormControl('SHONGOLOLER', [Validators.required]),
      Adress1:  new FormControl('CEBU CITY', [Validators.required]),
      Adress2:  new FormControl('CEBU CITY'),
      CountryId:  new FormControl(1),
      CityStateId:  new FormControl(1),
      Phone:  new FormControl('CEBU CITY'),
      FAX:  new FormControl('CEBU CITY'),
      URL:  new FormControl('CEBU CITY'),
      
    }, { validator: WhiteSpace(['Code','Name']) }
    );

    this.modalFormGroup.patchValue(this.item);
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
      CityStateId: this.modalForm.CityStateId.value,
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

}
