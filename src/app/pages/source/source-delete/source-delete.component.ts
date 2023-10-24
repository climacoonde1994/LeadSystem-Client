import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-delete',
  templateUrl: './source-delete.component.html',
  styleUrls: ['./source-delete.component.css']
})

export class SourceDeleteComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private router: Router,
    private sourceService: SourceService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.sourceService.delete(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully deleted " + response.data.name + " source.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

