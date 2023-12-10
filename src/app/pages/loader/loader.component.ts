import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = true;

  // Simulate an asynchronous operation
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}