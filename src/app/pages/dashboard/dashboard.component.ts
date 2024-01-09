import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeadService, } from 'src/app/services/lead.service';
import { ClientService } from 'src/app/services/client.service';
import { CountryService } from 'src/app/services/country.service';
import { ToastHelper } from 'src/app/helpers/toast.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public employee : any = {};
  public user : any = {};
  public name: string;
  public leadList : any [] = [];

  public leadToday : any [] = [];
  public leadOverDue: any [] = [];
  public leadOverDue2: any [] = [];
  public leadCallTom: any [] = [];
  public leadNeedAction: any [] = [];
 

  public cities: any[] = [];
  public countries: any[] = [];
  public clients: any[] = [];

  constructor(private authenticationService: AuthenticationService,
            public leadService: LeadService,
 
            public toastHelper: ToastHelper,
            public countryService: CountryService,
            public clientService : ClientService
    ) { }

  ngOnInit() 
  {
     
    this.countryService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.countries = response
      this.getLeadList();
      },
      error: response => {
        
      }
  }
  );
 

  this.clientService.getList('All')
  .pipe(first())
  .subscribe({
    next: response => {
    this.clients = response
    this.getLeadList();
    },
    error: response => {
      
    }
  }
  );

  this.employee = JSON.parse(localStorage.getItem('employee').toString())
  this.user = JSON.parse(localStorage.getItem('user').toString())
 
  }

  


  initializeLeads( ){
    var currentDate = new Date().setHours(0,0,0,0);
    var cdate = new Date()
    var tomorrowDate =  currentDate +86400000 ;
 
 
   for(var i = 0 ; i < this.leadList.length ; i++)
   {
   
    const client = this.clients.filter(x => x.ClientId == this.leadList[i]?.ClientId)[0]
    const country = this.countries.filter(x => x.CountryId == client?.CountryId)[0]
 
    this.leadList[i]["Country"] = country?.Code
    this.leadList[i]["Client"] = client?.Name
    this.leadList[i]["ActionNeeded"] = this.leadList[i].hasOwnProperty('ActionNeeded')  ?  this.leadList[i].ActionNeeded  : false
   
   }
    this.leadToday = this.leadList.filter(x => new Date(x.LeadDate).setHours(0,0,0,0) == currentDate && x.SalesPersonId == this.employee.EmployeeId )
    this.leadOverDue = this.leadList.filter(x => new Date(x.LeadDate).setHours(0,0,0,0) < currentDate && x.SalesPersonId == this.employee.EmployeeId  )
    this.leadOverDue2 = this.leadList.filter(x => new Date(x.LeadDate).setHours(0,0,0,0) < currentDate && x.SalesPersonId2 == this.employee.EmployeeId)
    this.leadCallTom = this.leadList.filter(x => new Date(x.FollowUpDate).setHours(0,0,0,0) == tomorrowDate && x.SalesPersonId == this.employee.EmployeeId)
    this.leadNeedAction = this.leadList.filter(x => x.ActionNeeded  == true && x.SalesPersonId == this.employee.EmployeeId )
  }

  getLeadList(){
    this.leadService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.leadList = response
      this.initializeLeads();
  
      },
      error: response => {
        
      }
    }
    );
  }
}
