import * as TypeMoq from 'typemoq';

import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt-interceptor';

describe('JwtInterceptor', () => {
  let service: JwtInterceptor;

  let authServiceMock: TypeMoq.IMock<AuthService>;

  beforeEach(() => {
    authServiceMock = TypeMoq.Mock.ofType(AuthService);

    service = new JwtInterceptor(authServiceMock.object);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
