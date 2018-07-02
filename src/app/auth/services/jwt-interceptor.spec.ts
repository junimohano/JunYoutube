import * as TypeMoq from 'typemoq';

import { AccessTokenStorage } from './access-token-storage';
import { JwtInterceptor } from './jwt-interceptor';

describe('JwtInterceptor', () => {
  let service: JwtInterceptor;

  let accessTokenStorageMock: TypeMoq.IMock<AccessTokenStorage>;

  beforeEach(() => {
    accessTokenStorageMock = TypeMoq.Mock.ofType(AccessTokenStorage);

    service = new JwtInterceptor(accessTokenStorageMock.object);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
