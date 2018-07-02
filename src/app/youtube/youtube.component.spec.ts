import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import * as TypeMoq from 'typemoq';

import { YoutubeService } from './services/youtube.service';
import { YoutubeComponent } from './youtube.component';
import { Store } from '@ngxs/store';

export class MockDomSanitizer {
}

export class MockChangeDetectorRef {
}

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  let youtubeServiceMock: TypeMoq.IMock<YoutubeService>;
  let matSnackBarMock: TypeMoq.IMock<MatSnackBar>;
  let storeMock: TypeMoq.IMock<Store>;

  beforeEach(async(() => {
    youtubeServiceMock = TypeMoq.Mock.ofType(YoutubeService);
    matSnackBarMock = TypeMoq.Mock.ofType(MatSnackBar);
    storeMock = TypeMoq.Mock.ofType(Store);

    TestBed.configureTestingModule({
      declarations: [YoutubeComponent],
      providers: [
        { provide: DomSanitizer, userClass: MockDomSanitizer },
        { provide: YoutubeService, useValue: youtubeServiceMock.object },
        { provide: MatSnackBar, useValue: matSnackBarMock.object },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
        { provide: Store, useValue: storeMock.object }
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
