import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let httpClientMock: TypeMoq.IMock<HttpClient>;

  beforeEach(() => {
    httpClientMock = TypeMoq.Mock.ofType(HttpClient);

    TestBed.configureTestingModule({
      providers: [
        YoutubeService,
        { provide: HttpClient, useValue: httpClientMock.object }
      ]
    });
  });

  it('should ...', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
