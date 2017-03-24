import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  searchData: SearchData = {
    inputUrl: '',
    url: '',
    firstUrl: '',
    index: '',
    nextToken: null
  };

  constructor() { }
  ngOnInit() { }

}
