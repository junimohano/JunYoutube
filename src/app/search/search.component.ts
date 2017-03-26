import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { YoutubeVideoComponent } from '../youtube-video/youtube-video.component';
import { YoutubePlaylistComponent } from '../youtube-playlist/youtube-playlist.component';
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

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url !== '/watch') {
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
