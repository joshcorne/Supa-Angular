// https://stackoverflow.com/questions/75320328/how-to-add-ng-mocks-to-a-fresh-angular-15-project/75323651
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});


// https://ng-mocks.sudo.eu/extra/install
import { ngMocks } from 'ng-mocks';

ngMocks.autoSpy('jasmine');

// In case, if you use @angular/router and Angular 14+.
// You might want to set a mock of DefaultTitleStrategy as TitleStrategy.
// A14 fix: making DefaultTitleStrategy to be a default mock for TitleStrategy
import { DefaultTitleStrategy, TitleStrategy } from '@angular/router'; // eslint-disable-line import/order
import { MockService } from 'ng-mocks'; // eslint-disable-line import/order
ngMocks.defaultMock(TitleStrategy, () => MockService(DefaultTitleStrategy));

// Usually, *ngIf and other declarations from CommonModule aren't expected to be mocked.
// The code below keeps them.
import { CommonModule } from '@angular/common'; // eslint-disable-line import/order
import { ApplicationModule } from '@angular/core'; // eslint-disable-line import/order
import { BrowserModule } from '@angular/platform-browser'; // eslint-disable-line import/order
ngMocks.globalKeep(ApplicationModule, true);
ngMocks.globalKeep(CommonModule, true);
ngMocks.globalKeep(BrowserModule, true);

// auto restore for jasmine and jest <27
// declare const jasmine: any;
import { MockInstance } from 'ng-mocks'; // eslint-disable-line import/order
jasmine.getEnv().addReporter({
  specDone: MockInstance.restore,
  specStarted: MockInstance.remember,
  suiteDone: MockInstance.restore,
  suiteStarted: MockInstance.remember,
});

import { AuthService, SupabaseService } from '@app/core/services';

import { of } from 'rxjs';
ngMocks.defaultMock(AuthService, () => ({
  isSignedIn$: of(true)
}));

// ngMocks.defaultMock(SupabaseService
// );
