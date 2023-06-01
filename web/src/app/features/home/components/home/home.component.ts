import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services';
import { environment } from '@app/environment';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  applicationName: string = '';
  personalWelcome: Observable<string> | undefined;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.applicationName = environment.applicationName;
    this.personalWelcome = this.authService.profile$.pipe(
      map(profile => {
        return profile?.first_name ? `, ${profile.first_name}` : '';
      })
    );
  }
}
