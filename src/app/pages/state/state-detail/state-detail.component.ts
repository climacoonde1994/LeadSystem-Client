import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastHelper } from 'src/app/helpers/toast.helper';
import { StateService } from 'src/app/services/state.service';
import { StateDeleteComponent } from '../state-delete/state-delete.component';
import { StateModalComponent } from '../state-modal/state-modal.component';
import { StateToggleComponent } from '../state-toggle/state-toggle.component';

@Component({
  selector: 'app-state-detail',
  templateUrl: './state-detail.component.html',
  styleUrls: ['./state-detail.component.css']
})
export class StateDetailComponent implements OnInit {

  public name: string;
  public item: any;
  public tab: number = 1;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastHelper: ToastHelper,
    private stateService: StateService,
    private location: Location) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.activatedRoute.params.subscribe(params => {
      this.stateService.getById(params['id'])
        .subscribe(response => {
          this.item = response.data;
        }, (error) => {
          this.toastHelper.showError(error.error.message);
        })
    });
  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(StateModalComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(StateToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadItem();
      }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(StateDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.location.back();
      }
    );
  }

  onBack() {
    this.location.back();
  }

}
