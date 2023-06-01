import { AuthService } from './auth.service';
import { MockBuilder, MockProvider } from 'ng-mocks';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { TestBed } from '@angular/core/testing';
import { Profile } from '@app/types';
import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let supabase: SupabaseService;
  let _user$ = new BehaviorSubject({ id: '1234' } as User | null | undefined);
  let _profile$ = new BehaviorSubject({ id: '1234' } as Profile | null | undefined);

  beforeEach(() => MockBuilder(AuthService)
    .provide(MockProvider(SupabaseService, {
        user: Promise.resolve(_user$.getValue()),
        client: {
          auth: {
            signOut: jasmine.createSpy('signOut'),
            onAuthStateChange: jasmine.createSpy('onAuthStateChange').and.callFake((callback: (event: string, session: any) => void) => {
              callback('SIGNED_IN', { user: _user$.getValue() });
            })
          },
          from: (table: string) => ({
            select: jasmine.createSpy('select').and.returnValue({
              eq: jasmine.createSpy('eq').and.returnValue({
                returns: jasmine.createSpy('returns').and.returnValue({
                  single: jasmine.createSpy('single').and.returnValue(Promise.resolve({ data: { id: '1234' } }))
                })
              })
            })
          }),
          channel: (channel: string) => ({
            on: jasmine.createSpy('on').and.callFake((event: string, filters: {}, callback: (payload: any) => void) => {
              callback({ new: { id: '1234' } });
            }).and.returnValue({
              subscribe: jasmine.createSpy('subscribe')
            })
          })
        }
      }, 'useValue')
    )
  );

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    supabase = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return `userId` on getUserId', () => {
    const userId = '1234';
    service['userId'] = userId;

    expect(service.getUserId()).toBe(userId);
  });

  it('should call supabase client signOut on signOut', () => {
    service.signOut();

    expect(supabase.client.auth.signOut).toHaveBeenCalled();
  });

  it('should set `userId` on user$ subscription', async () => {
    const userId = '1234';
    await _user$.next({ id: userId } as User);
    
    expect(service['userId']).toBe(userId);
  });
});