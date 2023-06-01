import { Injectable } from '@angular/core';
import { SupabaseService } from '@app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private supabase: SupabaseService
  ) { }

  updateProfile(userId: string, value: {}) {
    return this.supabase.client
      .from('profiles')
      .update(value)
      .eq('id', userId)
  }

}
