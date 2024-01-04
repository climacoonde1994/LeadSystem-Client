import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-default',
  templateUrl: './menu-default.component.html',
  styleUrls: ['./menu-default.component.css']
})

export class MenuDefaultComponent implements OnInit {

  @Input() item: any;
  public errors: any[];

  constructor(
    private menuService: MenuService,
    private toastHelper: ToastHelper,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onSubmit() {

    this.menuService.default(this.item._id, !this.item.Default)
      .pipe(first())
      .subscribe({
        next: response => { 
          this.toastHelper.showSuccess("You have successfully " + (response.Default ? "set" : "unset") + " " + response.Name + "  as default menu.");
          this.activeModal.close();
        },
        error: response => {
          this.errors = response.errors;
        }
      });

  }

}

