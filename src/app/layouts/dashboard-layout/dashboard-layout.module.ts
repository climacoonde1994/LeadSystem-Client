import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortDirective } from 'src/app/directives/sort.directive';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { DashboardLayoutRoutes } from './dashboard-layout.routing';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/account/profile/profile.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';
import { UserModalComponent } from 'src/app/pages/user/user-modal/user-modal.component';
import { UserDetailComponent } from 'src/app/pages/user/user-detail/user-detail.component';
import { RoleListComponent } from 'src/app/pages/role/role-list/role-list.component';
import { RoleModalComponent } from 'src/app/pages/role/role-modal/role-modal.component';
import { RoleDetailComponent } from 'src/app/pages/role/role-detail/role-detail.component';
import { PermissionListComponent } from 'src/app/pages/permission/permission-list/permission-list.component';
import { CountryListComponent } from 'src/app/pages/country/country-list/country-list.component';
import { CountryModalComponent } from 'src/app/pages/country/country-modal/country-modal.component';
import { CountryDetailComponent } from 'src/app/pages/country/country-detail/country-detail.component';
import { DocumentListComponent } from 'src/app/pages/document/document-list/document-list.component';
import { DocumentModalComponent } from 'src/app/pages/document/document-modal/document-modal.component';
import { DocumentDetailComponent } from 'src/app/pages/document/document-detail/document-detail.component';
import { StateListComponent } from 'src/app/pages/state/state-list/state-list.component';
import { StateModalComponent } from 'src/app/pages/state/state-modal/state-modal.component';
import { StateDetailComponent } from 'src/app/pages/state/state-detail/state-detail.component';
import { LeadListComponent } from 'src/app/pages/lead/lead-list/lead-list.component';
import { LeadClientModalComponent } from 'src/app/pages/lead/lead-client-modal/lead-client-modal.component';
import { LeadDetailComponent } from 'src/app/pages/lead/lead-detail/lead-detail.component';


import { HttpClientModule } from '@angular/common/http';
import { LeadCreateComponent } from 'src/app/pages/lead/lead-create/lead-create.component';
import { ClientListComponent } from 'src/app/pages/client/client-list/client-list.component';
import { ClientModalComponent } from 'src/app/pages/client/client-modal/client-modal.component';
import { ClientDetailComponent } from 'src/app/pages/client/client-detail/client-detail.component';
import { DepartmentListComponent } from 'src/app/pages/department/department-list/department-list.component';
import { DepartmentModalComponent } from 'src/app/pages/department/department-modal/department-modal.component';
import { DepartmentDetailComponent } from 'src/app/pages/department/department-detail/department-detail.component';
import { SpecialtyListComponent } from 'src/app/pages/specialty/specialty-list/specialty-list.component';
import { SpecialtyModalComponent } from 'src/app/pages/specialty/specialty-modal/specialty-modal.component';
import { SpecialtyDetailComponent } from 'src/app/pages/specialty/specialty-detail/specialty-detail.component';
import { UserTypeListComponent } from 'src/app/pages/usertype/usertype-list/usertype-list.component';
import { UserTypeModalComponent } from 'src/app/pages/usertype/usertype-modal/usertype-modal.component';
import { UserTypeDetailComponent } from 'src/app/pages/usertype/usertype-detail/usertype-detail.component';
import { SourceListComponent } from 'src/app/pages/source/source-list/source-list.component';
import { SourceModalComponent } from 'src/app/pages/source/source-modal/source-modal.component';
import { SourceDetailComponent } from 'src/app/pages/source/source-detail/source-detail.component';
import { MenuDetailComponent } from 'src/app/pages/menu/menu-detail/menu-detail.component';
import { MenuModalComponent } from 'src/app/pages/menu/menu-modal/menu-modal.component';
import { MenuListComponent } from 'src/app/pages/menu/menu-list/menu-list.component';
import { LeadNoteModalComponent } from 'src/app/pages/lead/lead-note-modal/lead-note-modal.component';
import { LeadProposalModalComponent } from 'src/app/pages/lead/lead-proposal-modal/lead-proposal-modal.component';
import { EmployeeListComponent } from 'src/app/pages/employee/employee-list/employee-list.component';
import { EmployeeModalComponent } from 'src/app/pages/employee/employee-modal/employee-modal.component';
import { EmployeeDetailComponent } from 'src/app/pages/employee/employee-detail/employee-detail.component';
import { LeadContactModalComponent } from 'src/app/pages/lead/lead-contact-modal/lead-contact-modal.component';
import { LeadDocumentModalComponent } from 'src/app/pages/lead/lead-document-modal/lead-document-modal.component';
import { LeadCutPasteModalComponent } from 'src/app/pages/lead/lead-cutpaste-modal/lead-cutpaste-modal.component';
import { LeadUpdateComponent } from 'src/app/pages/lead/lead-update/lead-update.component';
import { ContactDetailComponent } from 'src/app/pages/contact/contact-detail/contact-detail.component';
import { ContactModalComponent } from 'src/app/pages/contact/contact-modal/contact-modal.component';
import { ContactListComponent } from 'src/app/pages/contact/contact-list/contact-list.component';
import { LoaderComponent } from 'src/app/pages/loader/loader.component';
import { SystemTypeListComponent } from 'src/app/pages/systemtype/systemtype-list/systemtype-list.component';
import { SystemTypeModalComponent } from 'src/app/pages/systemtype/systemtype-modal/systemtype-modal.component';
import { SystemTypeDetailComponent } from 'src/app/pages/systemtype/systemtype-detail/systemtype-detail.component';
import { CityListComponent } from 'src/app/pages/city/city-list/city-list.component';
import { CityModalComponent } from 'src/app/pages/city/city-modal/city-modal.component';
import { CityDetailComponent } from 'src/app/pages/city/city-detail/city-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardLayoutRoutes,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule
  ],
  declarations: [
    SortDirective,
    DateAgoPipe,
    DashboardComponent,
    ProfileComponent,
    CountryListComponent, CountryModalComponent, CountryDetailComponent,
    DocumentListComponent, DocumentModalComponent, DocumentDetailComponent,
    StateListComponent, StateModalComponent, StateDetailComponent,
    LeadListComponent, LeadClientModalComponent, LeadDetailComponent,
    LeadCreateComponent,LeadContactModalComponent,LeadDocumentModalComponent,
    LeadCutPasteModalComponent,LeadUpdateComponent,
    UserListComponent, UserModalComponent, UserDetailComponent,
    RoleListComponent, RoleModalComponent, RoleDetailComponent,
    SourceListComponent, SourceModalComponent, SourceDetailComponent,
    ClientListComponent, ClientModalComponent, ClientDetailComponent,
    DepartmentListComponent, DepartmentModalComponent, DepartmentDetailComponent,
    MenuListComponent, MenuModalComponent, MenuDetailComponent,
    CityListComponent, CityModalComponent, CityDetailComponent,
    SpecialtyListComponent, SpecialtyModalComponent, SpecialtyDetailComponent,
    UserTypeListComponent ,UserTypeModalComponent, UserTypeDetailComponent,
    SystemTypeListComponent ,SystemTypeModalComponent, SystemTypeDetailComponent,
    PermissionListComponent, LeadNoteModalComponent ,LeadProposalModalComponent,
    EmployeeListComponent, EmployeeModalComponent,EmployeeDetailComponent,
   UserListComponent, UserModalComponent, UserDetailComponent,
   ContactListComponent, ContactModalComponent, ContactDetailComponent,
  ]
})

export class DashboardLayoutModule { }
