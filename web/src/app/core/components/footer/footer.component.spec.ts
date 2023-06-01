
import { FooterComponent } from './footer.component';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';
import { CoreModule } from '@app/core/core.module';
import { environment } from '@app/environment';

describe('FooterComponent', () => {
  let fixture: MockedComponentFixture<FooterComponent>;

  beforeEach(() => MockBuilder(FooterComponent, CoreModule));
  beforeEach(() => {
    fixture = MockRender(FooterComponent);
  })
  
  it('should create', () => {
    expect(fixture).toBeDefined();
  });

  it('should have `applicationName`', () => {
    expect(fixture.componentInstance.applicationName).toBe(environment.applicationName);
  });

  it('should have `applicationUrl`', () => {
    expect(fixture.componentInstance.applicationUrl).toBe(environment.applicationUrl);
  });

  it('should have `currentYear`', () => {
    const currentYear = new Date().getFullYear();

    expect(fixture.componentInstance.currentYear).toBe(currentYear);
  });
});
