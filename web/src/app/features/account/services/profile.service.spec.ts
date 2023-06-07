import { ProfileService } from './profile.service';
import { MockBuilder, ngMocks } from 'ng-mocks';

describe('AccountService', () => {
  let service: ProfileService;

  beforeEach(() => MockBuilder(ProfileService));

  beforeEach(() => {
    service = ngMocks.get(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
