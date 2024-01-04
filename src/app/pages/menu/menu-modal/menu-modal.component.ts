import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { MenuService } from 'src/app/services/menu.service';
import { WhiteSpace } from 'src/app/helpers/whitespace.validator';
import { CountryService } from 'src/app/services/country.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})

export class MenuModalComponent implements OnInit {

  @Input() item: any;
  public errors: any[];
  public modalFormGroup: FormGroup;
  public regionList: any[];
  public countries : any[];
  public user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private loadingService : LoadingService,
    private toastHelper: ToastHelper,
    private countryService: CountryService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user').toString())
    this.modalFormGroup = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Path: new FormControl('', [Validators.required]),
      Icon:  new FormControl('', [Validators.required]),
      
   
    }, { validator: WhiteSpace(['Name','Path','Icon']) }
    );

    this.modalFormGroup.patchValue(this.item);
 

  }

  onSubmit() {
    this.loadingService.isLoading = true
    const request: any = {
      Name: this.modalForm.Name.value,
      Description: this.modalForm.Description.value,
      Path: this.modalForm.Path.value,
      Icon: this.modalForm.Icon.value,
      CreatedById  : "",
      UpdatedById  : ""
      
    };

    if (this.item == null){
      request.CreatedById = this.user._id
      this.menuService.create(request)
      .pipe(first())
      .subscribe({
        next: response => {
          
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully created " + request.Name + " menu.");
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
      request.MenuId = this.item.MenuId;
      request.UpdatedById = this.user._id
      this.menuService.update(request)
      .pipe(first())
      .subscribe({
        next: response => {
          if(response.success)
          {
            this.toastHelper.showSuccess("You have successfully updated " + request.Name + " menu.");
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
