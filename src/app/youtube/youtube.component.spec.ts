import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import * as TypeMoq from 'typemoq';

import { YoutubeApiService } from './services/youtube-api.service';
import { YoutubeComponent } from './youtube.component';

export class MockDomSanitizer {
}

export class MockChangeDetectorRef {
}

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  let youtubeApiServiceMock: TypeMoq.IMock<YoutubeApiService>;
  let matSnackBarMock: TypeMoq.IMock<MatSnackBar>;

  beforeEach(async(() => {
    youtubeApiServiceMock = TypeMoq.Mock.ofType(YoutubeApiService);
    matSnackBarMock = TypeMoq.Mock.ofType(MatSnackBar);

    TestBed.configureTestingModule({
      declarations: [YoutubeComponent],
      providers: [
        { provide: DomSanitizer, userClass: MockDomSanitizer },
        { provide: YoutubeApiService, useValue: youtubeApiServiceMock.object },
        { provide: MatSnackBar, useValue: matSnackBarMock.object },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
