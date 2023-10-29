import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/account/profile/profile.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';
import { UserDetailComponent } from 'src/app/pages/user/user-detail/user-detail.component';
import { RoleListComponent } from 'src/app/pages/role/role-list/role-list.component';
import { RoleDetailComponent } from 'src/app/pages/role/role-detail/role-detail.component';
import { CountryDetailComponent } from '../../pages/country/country-detail/country-detail.component';
import { CountryListComponent } from '../../pages/country/country-list/country-list.component';
import { StateDetailComponent } from 'src/app/pages/state/state-detail/state-detail.component';
import { DocumentListComponent } from '../../pages/document/document-list/document-list.component';
import { DocumentDetailComponent } from '../../pages/document/document-detail/document-detail.component';
import { LeadListComponent } from 'src/app/pages/lead/lead-list/lead-list.component';
import { LeadCreateComponent } from 'src/app/pages/lead/lead-create/lead-create.component';
import { SourceListComponent } from 'src/app/pages/source/source-list/source-list.component';
import { DepartmentListComponent } from 'src/app/pages/department/department-list/department-list.component';
import { SpecialtyListComponent } from 'src/app/pages/specialty/specialty-list/specialty-list.component';
import { SystemTypeListComponent } from 'src/app/pages/systemtype/systemtype-list/systemtype-list.component';
import { ClientListComponent } from 'src/app/pages/client/client-list/client-list.component';
 


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'lead-system-list', component:LeadListComponent },
  { path: 'document-list', component: DocumentListComponent },
  { path: 'document-detail/:id', component: DocumentDetailComponent },
  { path: 'country-list', component: CountryListComponent },
  { path: 'country-detail/:id', component: CountryDetailComponent },
  { path: 'state-detail/:id', component: StateDetailComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'role-list', component: RoleListComponent },
  { path: 'role-detail/:id', component: RoleDetailComponent },
  { path: 'lead-create', component: LeadCreateComponent },
  { path: 'source-list', component: SourceListComponent },
  { path: 'department-list', component: DepartmentListComponent },
  { path: 'country-list', component: CountryListComponent },
  { path: 'specialty-list', component: SpecialtyListComponent },
  { path: 'systemtype-list', component: SystemTypeListComponent },
  { path: 'client-list', component: ClientListComponent },
];

export const DashboardLayoutRoutes = RouterModule.forChild(routes);
