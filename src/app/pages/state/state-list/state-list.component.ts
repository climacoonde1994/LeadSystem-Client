import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortDirective, SortEvent } from 'src/app/directives/sort.directive';
import { StateService } from 'src/app/services/state.service';
import { StateDeleteComponent } from '../state-delete/state-delete.component'
import { StateModalComponent } from '../state-modal/state-modal.component';
import { StateToggleComponent } from '../state-toggle/state-toggle.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})

export class StateListComponent implements OnInit {

  public id: number;
  public items: Observable<any[]>;
  public name: string;
  public total: Observable<number>;

  @ViewChildren(SortDirective) headers: QueryList<SortDirective>;

  constructor(public activatedRoute: ActivatedRoute,
    public stateService: StateService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loadList();
  }

  loadList() {
    this.stateService.loadList(this.id);
    this.items = this.stateService.items;
    this.total = this.stateService.total;
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.stateService.sortColumn = column;
    this.stateService.sortDirection = direction;

  }

  openModal(item?: any) {
    const modalRef = this.modalService.open(StateModalComponent);
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (data: any) => {
        this.loadList();
      }, (reason) => { }
    );
  }

  openToggleModal(item?: any) {
    const modalRef = this.modalService.open(StateToggleComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }

  openDeleteModal(item?: any) {
    const modalRef = this.modalService.open(StateDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        this.loadList();
      }
    );
  }


}
