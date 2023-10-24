import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SystemTypeService } from 'src/app/services/systemtype.service';

@Component({
  selector: 'app-systemtype-toggle',
  templateUrl: './systemtype-toggle.component.html',
  styleUrls: ['./systemtype-toggle.component.css']
})

export class SystemTypeToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private systemtypeService: SystemTypeService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.systemtypeService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " systemtype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

