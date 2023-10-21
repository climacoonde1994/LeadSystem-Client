import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastHelper } from 'src/app/helpers/toast.helper';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastComponent implements OnInit {

  constructor(public toastHelper: ToastHelper) { }

  ngOnInit() {
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
