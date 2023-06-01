import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '@app/core/services';
import { MockBuilder, MockRender, MockedComponentFixture, ngMocks } from 'ng-mocks';
import { SharedModule } from '@app/shared/shared.module';
import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { AccountModule } from '../..';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: MockedComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(() => MockBuilder(LoginComponent, AccountModule)
    .keep(ReactiveFormsModule, {
      export: true,
    })
  );

  beforeEach(() => {
    fixture = MockRender(LoginComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    service = ngMocks.findInstance(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset everything on resetForm', () => {
    // Set up the component to be in a state where it would be after a successful login
    component.magicLinkSent = true;
    component.loginForm.get('email')?.setValue('test');
    component.loginForm.setErrors({ test: true });

    // Reset the form
    component.resetForm();

    // Check that everything is reset
    expect(component.magicLinkSent).toBeFalse();
    expect(component.loginForm.get('email')?.value).toBe(null);
    expect(component.loginForm.errors).toBeNull();
  });

  describe('onSubmit with valid data', () => {
    const response = {
      error: null,
      data: { 
        user: null,
        session: null,
      }
    } as AuthResponse;

    beforeEach(() => {
      service.signInWithEmail = jasmine.createSpy().and.returnValue(Promise.resolve(response));
    });

    it('should send magic link', async () => {
      component.loginForm.get('email')?.setValue('test@test.com');
  
      await component.onSubmit();

      expect(service.signInWithEmail).toHaveBeenCalled();
      expect(component.magicLinkSent).toBeTrue();

      // TODO: Test finally
      // expect(component.magicLinkSending).toBeFalse();
    });
  });

  describe('onSubmit with invalid data', () => {
    const invalidResponse = {
      error: { message: 'test'} as AuthError,
      data: { 
        user: null,
        session: null,
      }
    };

    beforeEach(() => {
      service.signInWithEmail = jasmine.createSpy().and.returnValue(Promise.resolve(invalidResponse));
    });

    it('should show error message with populated form', async () => {
      component.loginForm.get('email')?.setValue('test@test.com');

      await component.onSubmit();

      expect(service.signInWithEmail).toHaveBeenCalled();
      expect(component.error).toEqual(invalidResponse!.error!.message);
    });

    it('should not submit with invalid form', async () => {
      await component.onSubmit();

      expect(service.signInWithEmail).toHaveBeenCalledTimes(0);
    });
  });
});
