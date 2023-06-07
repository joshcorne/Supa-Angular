
import { ProfileComponent } from './profile.component';
import { MockBuilder, MockRender, MockedComponentFixture, ngMocks } from 'ng-mocks';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from '@app/features/account';
import { Subject } from 'rxjs';
import { AuthService } from '@app/core/services';
import { Profile } from '@app/types';
import { ProfileService } from '../../services/profile.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: MockedComponentFixture<ProfileComponent>;
  let _fakeProfile$ = new Subject<Profile | null>();

  beforeEach(() => MockBuilder(ProfileComponent, AccountModule)
    .mock(ProfileService, {
      profile$: _fakeProfile$.asObservable(),
    })
    .keep(ReactiveFormsModule, {
      export: true,
    })
  );

  beforeEach(() => {
    fixture = MockRender(ProfileComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have reset `profileForm` when profile is null', () => {
    let nullForm = {
      first_name: null,
      last_name: null,
    };
    _fakeProfile$.next(null);

    expect(component.profileForm.value).toEqual(nullForm);
    expect(component.userId).toBeUndefined();
  });

  it('should have reset `profileForm` when profile set', () => {
    let profile = {
      first_name: 'John',
      last_name: 'Doe',
    };
    let userId = '123';
    _fakeProfile$.next({ ...profile, id: userId } as Profile);

    expect(component.profileForm.value).toEqual(profile);
    expect(component.userId).toEqual(userId);
  });

  describe('on profile valueChanges', () => {
    const profile = {
      first_name: 'Jane',
      last_name: 'Doe',
    };
    let service: ProfileService;

    beforeEach(() => {
      service = ngMocks.findInstance(ProfileService);
      service.updateProfile = jasmine.createSpy().and.returnValue(Promise.resolve(profile));
    });

    it('should update the profile when the form values change', () => {
      component.profileForm.setValue(profile);
  
      expect(service.updateProfile).toHaveBeenCalled();
    });
  
    it('should not update the profile when the form values are invalid', () => {
      component.profileForm.setValue({ first_name: null, last_name: null });
  
      expect(service.updateProfile).not.toHaveBeenCalled();
    });

    it('should show error from response', async () => {
      const response = { error: { message: 'test' }};
      service.updateProfile = jasmine.createSpy().and.returnValue(Promise.resolve(response));
      
      await component.profileForm.setValue(profile);
  
      expect(component.error).toBe(response.error.message);
    });
  });
});
