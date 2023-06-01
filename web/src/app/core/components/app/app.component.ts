import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services';
import { environment } from '@app/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';
  showAccountActions = false;
  applicationLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = environment.applicationName;
    this.authService.isSignedIn$.subscribe((isSignedIn: boolean) => {
      this.showAccountActions = isSignedIn;
      this.applicationLoading = false;
    });
  }

  signOut() {
    this.authService.signOut().then(result => {
      if(!result.error) {
        this.router.navigate(['account/login']);
      } else {
        console.error(result.error);
      }
    });
  }
}
