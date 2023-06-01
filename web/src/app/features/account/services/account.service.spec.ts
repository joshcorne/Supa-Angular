import { AccountService } from './account.service';
import { MockBuilder, ngMocks } from 'ng-mocks';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => MockBuilder(AccountService));

  beforeEach(() => {
    service = ngMocks.get(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
