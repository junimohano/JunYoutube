import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeVideoComponent } from '../youtube-video/youtube-video.component';
import { YoutubePlaylistComponent } from '../youtube-playlist/youtube-playlist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchData: SearchData;
  @Output() youtubeVideoEvent = new EventEmitter();
  @Output() youtubePlaylistEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url !== '/watch') {
      this.searchData.inputUrl = 'https://www.youtube.com' + this.router.url;
    }
  }

  searchClick() {
    if (this.searchData.inputUrl === '') {
      return;
    }

    this.searchData.index = '';
    this.searchData.nextToken = null;
    this.searchData.firstUrl = this.searchData.inputUrl;

    this.youtubeVideoEvent.emit(this.searchData.inputUrl);
    this.youtubePlaylistEvent.emit(true);
  }

  inputValueChanged(newValue) {
    this.searchClick();
  }

}
