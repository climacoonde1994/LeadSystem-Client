import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-toggle',
  templateUrl: './country-toggle.component.html',
  styleUrls: ['./country-toggle.component.css']
})

export class CountryToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private countryService: CountryService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.countryService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " country.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

