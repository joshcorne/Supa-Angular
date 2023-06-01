import { AppComponent } from './app.component';
import { CoreModule } from '@app/core/core.module';
import { AuthService } from '@app/core/services';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@app/environment';

describe('AppComponent', () => {

  let fixture: MockedComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;
  let _fakeIsSignedIn$ = new Subject<boolean>(); // Used to mock AuthService.isSignedIn$

  beforeEach(() => MockBuilder(AppComponent, CoreModule)
    .mock(AuthService, {
      isSignedIn$: _fakeIsSignedIn$.asObservable(),
      signOut: () => Promise.resolve({ error: null })
    })
    .mock(Router)
  );

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
    element = fixture.debugElement.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(fixture).toBeTruthy();
  });

  it('should show loading indicator when applicationLoading is true', () => {
    component.applicationLoading = true;
    fixture.detectChanges();

    expect(element.querySelector('app-loading')).toBeTruthy();
  });

  it(`should have title as environment applicationName`, () => {
    expect(component.title).toEqual(environment.applicationName);
  });

  it('should display router-outlet component once loaded', () => {
    component.applicationLoading = false;
    fixture.detectChanges();

    expect(element.querySelector('router-outlet')).toBeTruthy();
  });

  it('should display account actions if isSignedIn$ is true', () => {
    _fakeIsSignedIn$.next(true);
    fixture.detectChanges();

    expect(component.showAccountActions).toBeTrue();
    expect(element.querySelector('span#accountActionsButtonBar')).toBeTruthy();
  });

  it('should display account actions if isSignedIn$ is false', () => {
    _fakeIsSignedIn$.next(false);
    fixture.detectChanges();

    expect(component.showAccountActions).toBeFalse();
    expect(element.querySelector('span#accountActionsButtonBar')).toBeFalsy();
  });

  it(`should redirect on signOut`, async () => {
    const router = fixture.point.injector.get(Router);

    await component.signOut();

    expect(router.navigate).toHaveBeenCalledWith(['account/login']);
  });
});
