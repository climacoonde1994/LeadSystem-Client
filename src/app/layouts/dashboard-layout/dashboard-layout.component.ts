import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  public isAuthenticated: boolean;
  public rolePermissions: any[];
  public name: string;
  public role: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.authenticationChanged.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.name = this.authenticationService.getName();
    this.role = this.authenticationService.getRole();

    this.authenticationService.getRolePermissionList(this.authenticationService.getRoleId())
        .pipe(first())
        .subscribe({
          next: response => {
            this.rolePermissions = response.data;
          }
        });
  }

  onLogout = () => {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

}
