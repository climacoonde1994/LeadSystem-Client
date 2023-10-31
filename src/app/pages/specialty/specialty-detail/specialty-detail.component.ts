import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { SpecialtyDeleteComponent } from '../specialty-delete/specialty-delete.component';
import { SpecialtyModalComponent } from '../specialty-modal/specialty-modal.component';
import { SpecialtyToggleComponent } from '../specialty-toggle/specialty-toggle.component';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { first } from 'rxjs/operators';
import { SpecialtyDefaultComponent } from '../specialty-default/specialty-default.component';

@Component({
  selector: 'app-specialty-detail',
  templateUrl: './specialty-detail.component.html',
  styleUrls: ['./specialty-detail.component.css']
})
export class SpecialtyDetailComponent implements OnInit {

  public item: any;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private specialtyService: SpecialtyService,
    private location: Location) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.specialtyService.getById(params['id'])
        .subscribe(response => {
          this.item = response;
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
      );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.router.navigate(['/specialty-list']);
      }, (reason) => { }
    );
  }

  onBack() {
    this.location.back();
  }

  openDefaultModal(item?: any) {
    const modalRef = this.modalService.open(SpecialtyDefaultComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }


}
