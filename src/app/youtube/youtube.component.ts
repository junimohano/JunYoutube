import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  searchData: SearchData = {
    inputUrl: '',
    firstUrl: '',
    url: '',
    index: '',
    nextToken: null,
    videoExtension: '',
    audioBitrate: 0,
    resolution: 0
  };

  constructor() { }
  ngOnInit() { }

}
