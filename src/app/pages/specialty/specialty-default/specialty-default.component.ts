import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-specialty-default',
  templateUrl: './specialty-default.component.html',
  styleUrls: ['./specialty-default.component.css']
})

export class SpecialtyDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private specialtyService: SpecialtyService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.specialtyService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default specialty.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

