import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-specialty-delete',
  templateUrl: './specialty-delete.component.html',
  styleUrls: ['./specialty-delete.component.css']
})

export class SpecialtyDeleteComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private router: Router,
    private specialtyService: SpecialtyService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.specialtyService.delete(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully deleted " + response.data.name + " specialty.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

