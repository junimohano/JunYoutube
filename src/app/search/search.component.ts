import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { YoutubeVideoComponent } from '../youtube-video/youtube-video.component';
import { YoutubePlaylistComponent } from '../youtube-playlist/youtube-playlist.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Input() searchData: SearchData;
  @Output() youtubeVideoEvent = new EventEmitter();
  @Output() youtubePlaylistEvent = new EventEmitter();

  searchInput: (event: KeyboardEvent) => void;
  minimumInputLength = 11;
  inputDebounceTime = 300;

  // clickmonWidth: number;
  // clickmonHeight: number;
  // clickmonSrc: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    // let isMobile = false;
    // if (/android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(navigator.userAgent)) {
    //   isMobile = true;
    // }
    // this.clickmonWidth = isMobile ? 150 : 728;
    // this.clickmonHeight = isMobile ? 150 : 90;
    // this.clickmonSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`${window.location.protocol}//${isMobile ? 'mtab' : 'tab2'}.clickmon.co.kr/pop/wp_${isMobile ? 'm_150' : 'ad_728'}.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1032700%7C%5E%7CAdver_M_1003115&mon_rf=REFERRER_URL`);
  }

  ngOnInit() {
    if (this.router.url !== '/watch' && this.router.url !== '/watch?utm_source=web_app_manifest') {
      this.searchData.inputUrl = 'https://www.youtube.com' + this.router.url;
    }

    this.inputChanges(this.inputDebounceTime).subscribe(value => {
      if (value.length > this.minimumInputLength) {
        this.searchClick();
      }
    });
  }

  inputChanges(debounce: number): Observable<string> {
    return Observable.create(observer => {
      this.searchInput = (event: KeyboardEvent) => {
        observer.next((<HTMLInputElement>event.target).value);
      };
    }).distinctUntilChanged().debounceTime(debounce);
  }

  ngAfterViewInit(): void {
    if (this.searchData.inputUrl !== '') {
      this.searchClick();
    }
  }

  searchClick() {
    this.searchData.index = '';
    this.searchData.nextToken = null;
    this.searchData.firstUrl = this.searchData.inputUrl;

    this.youtubeVideoEvent.emit(this.searchData.inputUrl);
    this.youtubePlaylistEvent.emit(true);
  }

}
