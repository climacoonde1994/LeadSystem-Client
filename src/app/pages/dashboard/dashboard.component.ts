import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeadService, } from 'src/app/services/lead.service';
import { ClientService } from 'src/app/services/client.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeadContactService } from 'src/app/services/lead-contact.service';
import { NoteService } from 'src/app/services/notes.service';
import { ToastHelper } from 'src/app/helpers/toast.helper';

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
  public leadCallTom: any [] = [];
  public leadNeedAction: any [] = [];
  public employeeId : string = "1";

  public cities: any[] = [];
  public countries: any[] = [];
  public clients: any[] = [];

  constructor(private authenticationService: AuthenticationService,
            public leadService: LeadService,
            public cityService: CityService,
            public toastHelper: ToastHelper,
            public countryService: CountryService,
            public clientService : ClientService
    ) { }

  ngOnInit() 
  {
    this.name = this.authenticationService.getName();
  
    

    this.countryService.getList()
  .pipe(first())
  .subscribe({
    next: response => {
    this.countries = response
   
    },
    error: response => {
      
    }
  }
  );
  
  this.cityService.getList()
  .pipe(first())
  .subscribe({
    next: response => {
    this.cities = response
    },
    error: response => {
      
    }
  }
  );

  this.clientService.getList()
  .pipe(first())
  .subscribe({
    next: response => {
    this.clients = response
    },
    error: response => {
      
    }
  }
  );

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

  


  initializeLeads( ){
    var currentDate = new Date().setHours(0,0,0,0);
    var cdate = new Date()
   var tomorrowDate = cdate.setDate(cdate.getDate() + 1);
 
  
    this.leadToday = this.leadList.filter(x => new Date(x.MeetDate).setHours(0,0,0,0) == currentDate && x.SalesPersonId == this.employeeId)
    this.leadOverDue = this.leadList.filter(x => new Date(x.FollowUpDate).setHours(0,0,0,0) < currentDate && x.SalesPersonId == this.employeeId)
    this.leadOverDue2 = this.leadList.filter(x => new Date(x.FollowUpDate2).setHours(0,0,0,0) < currentDate && x.SalesPersonId2 == this.employeeId)
    this.leadCallTom = this.leadList.filter(x => new Date(x.FollowUpDate).setHours(0,0,0,0) == currentDate && x.SalesPersonId == this.employeeId)
    this.leadNeedAction = this.leadList.filter(x => x.ActionNeeded.toLowerCase() == 'true'  )
    for(var i = 0 ; i < this.leadList.length ; i++)
      {
        console.log(this.leadList[i])
     
      
       const client = this.clients.filter(x => x.ClientId == this.leadToday[i].ClientId)[0]
       const country = this.countries.filter(x => x.CountryId == client.CountryId)[0]
        this.leadToday[i]["Country"] = country.Code
      }
  }

  async getAllCountries(){
    this.countryService.getList()
      .pipe(first())
      .subscribe({
        next: response => {
          this.countries = response;

        },
        error: response => {
        }
      }
      );
  }

  



  

}
