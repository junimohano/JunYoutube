import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  let httpClientMock: TypeMoq.IMock<HttpClient>;

  beforeEach(() => {
    httpClientMock = TypeMoq.Mock.ofType(HttpClient);

    TestBed.configureTestingModule({
      providers: [
        YoutubeApiService,
        { provide: HttpClient, useValue: httpClientMock.object }
      ]
    });
  });

  it('should ...', inject([YoutubeApiService], (service: YoutubeApiService) => {
    expect(service).toBeTruthy();
  }));
});
