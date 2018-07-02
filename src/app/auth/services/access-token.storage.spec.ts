import { AccessTokenStorage } from './access-token.storage';

describe('AccessTokenStorage', () => {
  let service: AccessTokenStorage;

  beforeEach(() => {
    service = new AccessTokenStorage();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
