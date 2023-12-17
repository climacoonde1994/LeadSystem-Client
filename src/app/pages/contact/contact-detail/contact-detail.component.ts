import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { ContactService } from 'src/app/services/contact.service';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  public item: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private contactService: ContactService) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.contactService.getById(params['id'])
        .subscribe(response => {
       
          this.item = response;
       
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(ContactModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(ContactDeleteComponent);
    modalRef.componentInstance.item = item;
  }

}
