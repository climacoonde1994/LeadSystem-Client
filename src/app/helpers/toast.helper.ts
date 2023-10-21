import { Injectable, TemplateRef } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ToastHelper {

  toasts: any[] = [];

  constructor() { }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  showSuccess(content: string) {
    this.show(content, {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
    });
  }

  showError(content: string) {
    this.show(content, {
      classname: 'bg-danger text-light',
      delay: 3000 ,
      autohide: true,
    });
  }
}
