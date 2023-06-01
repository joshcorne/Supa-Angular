import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { Database } from '@app/types';
import { environment } from '@app/environment';

/**
 * This service is used to access the supabase client
 * and get the user and session.
 */
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private _client: SupabaseClient;
  
  constructor( ) {
    const { supabaseUrl, supabaseKey } = environment.supabaseClientConfig;
    this._client = createClient<Database>(
      supabaseUrl,
      supabaseKey
    );
  }

  get user(): Promise<UserResponse> {
    return this.client.auth.getUser();
  }

  get session(): Promise<{}> {
      return this.client.auth.getSession();
  }

  get client(): SupabaseClient {
    return this._client;
  }
}
