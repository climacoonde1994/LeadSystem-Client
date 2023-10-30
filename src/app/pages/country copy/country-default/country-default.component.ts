import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-default',
  templateUrl: './country-default.component.html',
  styleUrls: ['./country-default.component.css']
})

export class CountryDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private countryService: CountryService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.countryService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default country.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

