import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  public isAuthenticated: boolean;
  public permissions: any[];
  public user: any = {};
  public Name: any = "Climaco";
  public activemenu : any[] = [];

  constructor(private router: Router,    private menuService : MenuService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.startInactivityTimer();
    window.addEventListener('mousemove', this.handleUserActivity.bind(this));
    window.addEventListener('keydown', this.handleUserActivity.bind(this));
    this.user = JSON.parse(localStorage.getItem('user').toString())
    this.permissions = JSON.parse(localStorage.getItem('permissions').toString())
 
 
    this.authenticationService.authenticationChanged.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.Name = this.user.FullName

    
    this.menuService.getList()
    .pipe(first())
    .subscribe({
      next: response => {
      this.activemenu = response
      this.activemenu  =  this.mappedMenu(this.activemenu.filter(x => x.Enabled)) 
      
      },
      error: response => {
        
      }
    }
    );


 
  }

  onLogout = () => {
     
   this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }


  private handleUserActivity(): void {
    this.authenticationService.resetInactivityTimer();
    this.authenticationService.startInactivityTimer();
  }

  mappedMenu(menu : any[]) :any{
    var filteredmenu = []; 
   for(var i = 0 ; i < this.permissions.length ; i++)
   {
      var hasmenu = menu.filter(x => x._id == this.permissions[i].MenuId)[0]

      if(hasmenu != null)
      {
        if(this.permissions[i].View || this.permissions[i].Add || this.permissions[i].Edit || this.permissions[i].Delete)
        {
          filteredmenu.push(hasmenu)
        }
        
      }
     
     
   }
   return filteredmenu
  }

}
