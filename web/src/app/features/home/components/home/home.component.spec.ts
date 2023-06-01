
import { HomeComponent } from './home.component';
import { AuthService } from '@app/core/services';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';
import { HomeModule } from '../../home.module';
import { BehaviorSubject, Subject, lastValueFrom, of } from 'rxjs';
import { Profile } from '@app/types';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: MockedComponentFixture<HomeComponent>;
  let _fakeProfile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>({} as Profile);

  beforeEach(() => MockBuilder(HomeComponent, HomeModule)
    .mock(AuthService, {
      profile$: _fakeProfile$.asObservable()
    })
  );

  beforeEach(() => {
    fixture = MockRender(HomeComponent);
    component = fixture.point.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display first name if user is logged in', async () => {
    const profile = { first_name: 'Test' } as Profile;
    _fakeProfile$.next(profile);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(profile.first_name);
  });
});
