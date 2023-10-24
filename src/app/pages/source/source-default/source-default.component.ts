import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-default',
  templateUrl: './source-default.component.html',
  styleUrls: ['./source-default.component.css']
})

export class SourceDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private sourceService: SourceService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.sourceService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default source.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

