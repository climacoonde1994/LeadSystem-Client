import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-specialty-toggle',
  templateUrl: './specialty-toggle.component.html',
  styleUrls: ['./specialty-toggle.component.css']
})

export class SpecialtyToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private specialtyService: SpecialtyService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.specialtyService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " specialty.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

