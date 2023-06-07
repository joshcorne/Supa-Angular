import { Injectable } from '@angular/core';
import { SupabaseService } from '@app/core/services';
import { Profile } from '@app/types';
import { RealtimeChannel } from '@supabase/supabase-js';
import { BehaviorSubject, skipWhile, Observable } from 'rxjs';

/**
 * This manages anything regarding the profile.
 * For the auth, see {@link AuthService}
 * 
 * {@link https://gist.github.com/kylerummens/c2ec82e65d137f3220748ff0dee76c3f}
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Profile state
  private _profile$ = new BehaviorSubject<Profile | null | undefined>(undefined);
  profile$ = this._profile$.pipe(skipWhile(val => typeof val === 'undefined')) as Observable<Profile | null>;
  private profileSubscription?: RealtimeChannel;

  constructor(
    private supabase: SupabaseService
  ) { }

  updateProfile(userId: string, value: {}) {
    return this.supabase.client
      .from('profiles')
      .update(value)
      .eq('id', userId)
  }

  clearCurrentProfile() {
    this._profile$.next(undefined);
  }

  onSignIn(userId: string) {
    // Get the profile
    this.supabase
    .client
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .returns<Profile>()
    .single()
    .then(res => {
      
      this._profile$.next(res.data ?? null);
      
      // If the db profile changes, update the profile
      this.profileSubscription = this.supabase
        .client
        .channel('public:profiles')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: 'id=eq.' + userId
        }, (payload: any) => {
          this._profile$.next(payload.new)
        })
        .subscribe();
    });
  }

  onSignOut() {
    this._profile$.next(null);
    if(this.profileSubscription) {
      this.supabase.client.removeChannel(this.profileSubscription).then(res => {
        console.log(res);
      })
    }
  }
}
