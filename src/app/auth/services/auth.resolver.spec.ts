import * as TypeMoq from 'typemoq';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let service: AuthResolver;

  let authServiceMock: TypeMoq.IMock<AuthService>;

  beforeEach(() => {
    authServiceMock = TypeMoq.Mock.ofType(AuthService);

    service = new AuthResolver(authServiceMock.object);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
