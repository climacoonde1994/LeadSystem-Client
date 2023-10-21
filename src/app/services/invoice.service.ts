import { DecimalPipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sort.directive';
import { RepositoryHelper } from '../helpers/repository.helper';
import { SearchResult } from '../interfaces/search-result';
import { State } from '../interfaces/state'


const compare = (v1: string | number | boolean | Date, v2: string | number | boolean | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(items: any[], column: SortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return items;
  } else {
    return [...items].sort((a, b) => {
      const result = compare(a[column], b[column]);
      return direction === 'asc' ? result : -result;
    });
  }
}

function matches(item: any, term: string, pipe: PipeTransform) {
  return item;
}

@Injectable({ providedIn: 'root'})

export class InvoiceService {

  private $loading = new BehaviorSubject<boolean>(true);
  private $search = new Subject<void>();
  private $items = new BehaviorSubject<any[]>([]);
  private $total = new BehaviorSubject<number>(0);

  private $state: State  = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private repositoryHelper: RepositoryHelper, private decimalPipe: DecimalPipe) { }

  private _set(patch: Partial<State>) {
    Object.assign(this.$state, patch);
    this.$search.next();
  }

  get items() { return this.$items.asObservable(); }
  get total() { return this.$total.asObservable(); }
  get loading() { return this.$loading.asObservable(); }
  get page() { return this.$state.page; }
  get pageSize() { return this.$state.pageSize; }
  get searchTerm() { return this.$state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private search(items: any[]): Observable<SearchResult> {

    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this.$state;
    items = sort(items, sortColumn, sortDirection);
    items = items.filter(item => matches(item, searchTerm, this.decimalPipe));
    let total = items.length;
    items = items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({items, total});
  }

  public loadList = () => {
    this.getList().subscribe(response => {
      this.$search.pipe(
        tap(() => this.$loading.next(true)),
        debounceTime(200),
        switchMap(() => this.search(response.data)),
        delay(200),
        tap(() => this.$loading.next(false))
      ).subscribe(result => {
        this.$items.next(result.items);
        this.$total.next(result.total);
      });

      this.$search.next();
    });
  }

  public getList = () => {
    return this.repositoryHelper.get('api/invoice/getList');
  }

  public getById = (id: number) => {
    return this.repositoryHelper.get('api/invoice/getById?id=' + id);
  }

  public create = (body: any) => {
    return this.repositoryHelper.post('api/invoice/create', body);
  }

  public update = (body: any) => {
    return this.repositoryHelper.put('api/invoice/update', body);
  }

  public delete = (id: number) => {
    return this.repositoryHelper.delete('api/invoice/delete?id=' + id);
  }

  public toggle = (id: number) => {
    return this.repositoryHelper.put('api/invoice/toggle?id=' + id, null);
  }

  public uploadFile(id: number, description : string,body: FormData) {
    return this.repositoryHelper.upload('api/invoice/uploadFile?id=' + id + '&description=' + description, body);
  }

  
}
