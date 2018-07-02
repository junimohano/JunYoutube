import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { AccessTokenStorage } from './access-token.storage';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpClientMock: TypeMoq.IMock<HttpClient>;
  let accessTokenStorageMock: TypeMoq.IMock<AccessTokenStorage>;

  beforeEach(() => {
    httpClientMock = TypeMoq.Mock.ofType(HttpClient);
    accessTokenStorageMock = TypeMoq.Mock.ofType(AccessTokenStorage);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientMock.object },
        { provide: AccessTokenStorage, useValue: accessTokenStorageMock.object }
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
