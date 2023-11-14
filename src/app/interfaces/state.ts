import { SortColumn, SortDirection } from "../directives/sort.directive";

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

export interface LeadState {
  page: number;
  pageSize: number;
  searchTerm: string;
  excludeTerm: any[],
  employeeTerm: any[],
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

