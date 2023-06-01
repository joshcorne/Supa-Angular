import { TestBed } from '@angular/core/testing';
import { SupabaseService } from './supabase.service';
import { MockProvider } from 'ng-mocks';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SupabaseService,
      ],
    });
    service = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have `getUser`', () => {
    expect(service.user).toBeDefined();
  });

  it('should have `getSession`', () => {
    expect(service.session).toBeDefined();
  });

  it('should have `getClient`', () => {
    expect(service.client).toBeDefined();
  });
});
