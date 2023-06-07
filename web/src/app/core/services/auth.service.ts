import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@app/core/services';
import { AuthError, AuthResponse, Provider, RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, first, map, skipWhile } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Profile } from '@app/types';
import { ProfileService } from '@app/features/account/services';

/**
 * This service is responsible for managing authentication.
 * It calls Supabase to handle authentication.
 * This manages anything regarding the auth table.
 * For the profile table, see {@link ProfileService}
 * 
 * {@link https://supabase.io/docs/guides/auth}
 * 
 * {@link https://gist.github.com/kylerummens/c2ec82e65d137f3220748ff0dee76c3f}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Supabase user state
  private _user$ = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this._user$.pipe(skipWhile(val => typeof val === 'undefined')) as Observable<User | null>;
  private userId?: string;

  isSignedIn$ = this.profileService.profile$.pipe(map(profile => !!profile));

  constructor(
    private supabase: SupabaseService,
    private profileService: ProfileService
  ) {
    // Get the current user
    this.supabase.user.then(({ data, error }) => {
      // Set the current user in the service
      this._user$.next(data && data.user && !error ? data.user : null);

      // Listen for changes to the user
      this.supabase.client.auth.onAuthStateChange((event, session) => {
        this._user$.next(session?.user || null);
      });
    })
    .catch(err => {
      console.error(err);
    });

    // If the user changes
    this.user$.subscribe(user => {
      if (user) {
        if(user.id !== this.userId) {
          const userId = user.id;
          this.userId = userId;
          this.profileService.onSignIn(userId);
        }
      } else {
        // Clean up on sign out
        delete this.userId;
        this.profileService.onSignOut();
      }
    });
  }

  singInWithOAuth(provider: Provider): Promise<void> {
    this.profileService.clearCurrentProfile();
    return new Promise<void>((resolve, reject) => {
      this.supabase.client.auth.signInWithOAuth({ provider: provider })
        .then(({ data, error }) => {
          if (error || !data) {
            reject(error);
          } else {
            // Once profile is set, we can proceed
            this.profileService.profile$.pipe(first()).subscribe(() => {
              resolve();
            });
          }
        });
    });
  }

  signInWithEmail(email: string): Promise<AuthResponse> {
    return this.supabase.client.auth.signInWithOtp({'email': email});
  }

  signOut(): Promise<{ error: AuthError | null }> {
    return this.supabase.client.auth.signOut();
  }

  getUserId(): string {
    return this.userId!;
  }

  /**
   * @implements {CanMatchFn}
   * @param route 
   * @param segments 
   * @returns {Observable<boolean>}
   * @memberof AuthService
   * @description This method is used to check if a user is signed in.
   */
  canMatchSignedIn: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  ) => {
    // Allow access if auth service says we're signed in
    return this.isSignedIn$.pipe(map(x => x));
  }

  /**
   * @implements {CanActivateFn}
   * @param snapshot
   * @param state
   * @returns {Observable<boolean>}
   * @memberof AuthService
   * @description
   * This method is used to check if a user is signed in.
   * If they are not, they will be redirected to the login page.
   */
  canActivateSignedIn: CanActivateFn = (
    snapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    // Allow access if auth service says we're signed in
    const router = inject(Router);
    return this.isSignedIn$.pipe(map(x => {
        if(!x) {
            // Redirect to the /login route, while capturing the current url so we can redirect after login
          router.navigate(['/account/login'], {
              queryParams: { returnUrl: state.url }
          });
        }
        return x;
    }));
  }
}
