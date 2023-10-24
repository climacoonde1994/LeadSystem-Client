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

    this.isAuthenticated = true;
    this.name = this.authenticationService.getName();
    this.role = this.authenticationService.getRole();

   
  }

  onLogout = () => {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

}
