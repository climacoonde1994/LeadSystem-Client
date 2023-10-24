import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-toggle',
  templateUrl: './source-toggle.component.html',
  styleUrls: ['./source-toggle.component.css']
})

export class SourceToggleComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private sourceService: SourceService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.sourceService.toggle(this.item._id , !this.item.Enabled)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully " + (response.Enabled ? "enabled" : "disabled") + " " + this.item.Name + " source.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

