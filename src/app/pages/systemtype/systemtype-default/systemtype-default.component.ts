import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SystemTypeService } from 'src/app/services/systemtype.service';

@Component({
  selector: 'app-systemtype-default',
  templateUrl: './systemtype-default.component.html',
  styleUrls: ['./systemtype-default.component.css']
})

export class SystemTypeDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private systemtypeService: SystemTypeService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.systemtypeService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default systemtype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

