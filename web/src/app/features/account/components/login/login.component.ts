import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services';
import { AuthResponse, Provider } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  error?: string;
  magicLinkSending: boolean = false;
  magicLinkSent: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {

  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {

      this.magicLinkSending = true;

      delete this.error;

      const { email } = this.loginForm.value;
      //Remove null/undefined
      this.authService.signInWithEmail(email!)
        .then((response: AuthResponse) => {
          if(response.error || !response.data) {
            this.error = response.error ? response.error?.message : 'An unknown error occurred.';
          } else {
            this.magicLinkSent = true;
          }
        })
        .catch((error) => {
          if(error instanceof Error) {
            this.error = error.message;
          }
        })
        .finally(() => {
          this.magicLinkSending = false;
        });
    } else {
      this.error = 'Please enter a valid email address.';
    }
  }

  signInWithOAuth(provider: Provider) {
    delete this.error;
    
    this.authService.singInWithOAuth(provider)
      .catch((error) => {
        this.error = error.message;
      });
  }

  resetForm() {
    this.loginForm.reset();
    this.magicLinkSent = false;
  }
}
