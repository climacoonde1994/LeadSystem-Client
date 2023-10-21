import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-state-toggle',
  templateUrl: './state-toggle.component.html',
  styleUrls: ['./state-toggle.component.css']
})

export class StateToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private stateService: StateService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.stateService.toggle(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.data.isEnabled ? "enabled" : "disabled") + " " + this.item.name + " state.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

