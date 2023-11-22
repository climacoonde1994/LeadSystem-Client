import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  public isAuthenticated: boolean;
  public rolePermissions: any[];
  public user: any = {};
  public Name: any = "Climaco";

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.authenticationChanged.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authenticationService.loggedUser.subscribe(user => {
    
      this.user = user;
      this.Name = this.user.FullName
    
    });
 
 
  }

  onLogout = () => {
     
   this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

}
