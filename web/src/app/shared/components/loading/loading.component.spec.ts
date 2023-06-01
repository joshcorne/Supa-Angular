import { LoadingComponent } from './loading.component';
import { SharedModule } from '@app/shared/shared.module';
import { MockBuilder, MockRender, MockedComponentFixture, ngMocks } from 'ng-mocks';

describe('LoadingComponent', () => {
  let fixture: MockedComponentFixture<LoadingComponent>;
  let component: LoadingComponent;

  beforeEach(() => MockBuilder(LoadingComponent, SharedModule));

  beforeEach(() => {
    fixture = MockRender(LoadingComponent);
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
