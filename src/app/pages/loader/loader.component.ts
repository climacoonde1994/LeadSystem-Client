import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  
  constructor(public loadingService: LoadingService) { }
  @Input() isLoading: boolean = false; 
}