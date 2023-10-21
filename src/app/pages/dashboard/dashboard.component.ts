import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public name: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.name = this.authenticationService.getName();
  }

}
