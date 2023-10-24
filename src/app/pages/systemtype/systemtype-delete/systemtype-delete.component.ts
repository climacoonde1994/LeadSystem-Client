import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { SystemTypeService } from 'src/app/services/systemtype.service';

@Component({
  selector: 'app-systemtype-delete',
  templateUrl: './systemtype-delete.component.html',
  styleUrls: ['./systemtype-delete.component.css']
})

export class SystemTypeDeleteComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private router: Router,
    private systemtypeService: SystemTypeService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.systemtypeService.delete(this.item.id)
      .pipe(first())
      .subscribe({
        next: response => {
          this.toastHelper.showSuccess("You have successfully deleted " + response.data.name + " systemtype.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

