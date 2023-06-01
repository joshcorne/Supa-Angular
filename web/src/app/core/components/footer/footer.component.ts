import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment';

/**
 * Currently planning a single consistent footer across application whether end user,
 * admin or superuser. For that reason, component will be core.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  applicationName: string = '';
  applicationUrl: string = '';
  
  constructor( ) { }

  ngOnInit() {
    this.applicationName = environment.applicationName;
    this.applicationUrl = environment.applicationUrl;
  }
}
