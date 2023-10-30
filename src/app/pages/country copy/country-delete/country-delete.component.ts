import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-delete',
  templateUrl: './country-delete.component.html',
  styleUrls: ['./country-delete.component.css']
})

export class CountryDeleteComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private router: Router,
    private countryService: CountryService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.countryService.delete(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully deleted " + response.data.name + " country.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

