import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeadService, } from 'src/app/services/lead.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public name: string;
  public leadList : any [] = [];

  public leadToday : any [] = [];
  public leadOverDue: any [] = [];
  public leadOverDue2: any [] = [];
  public employeeId : string = "1";
  constructor(private authenticationService: AuthenticationService,
            public leadService: LeadService
    ) { }

  ngOnInit() {
    this.name = this.authenticationService.getName();

    this.leadService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.leadList = response
        console.log( this.leadList)
      },
      error: response => {
        
      }
    }
    );
  }


  

}
