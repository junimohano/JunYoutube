import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeVideoComponent } from '../youtube-video/youtube-video.component';
import { YoutubeApiService } from '../shared/services/youtube-api.service';

@Component({
  selector: 'app-youtube-playlist',
  templateUrl: './youtube-playlist.component.html',
  styleUrls: ['./youtube-playlist.component.css']
})
export class YoutubePlaylistComponent implements OnInit {

  @Input() searchData: SearchData;
  @Output() youtubeVideoEvent = new EventEmitter();

  youtubePlaylist: YoutubePlaylist;
  isVideoListSearching = false;

  constructor(private youtubeApiService: YoutubeApiService) { }

  ngOnInit() {
  }

  openClick(videoUrl) {
    this.youtubeVideoEvent.emit('https://www.youtube.com/watch?v=' + videoUrl);
  }

  getYoutubePlaylist(isReset: boolean) {

    if (isReset) {
      this.isVideoListSearching = true;
      this.youtubePlaylist = null;
    } else {
      this.searchData.url = this.searchData.firstUrl;
    }

    this.youtubeApiService.getYoutubePlaylist(this.searchData)
      .subscribe(
      result => {
        try {
          if (result.status === 200) {
            const resultList: YoutubePlaylist = result.json();
            if (this.youtubePlaylist == null) {
              this.youtubePlaylist = resultList;
            } else {
              this.youtubePlaylist.isPlaylist = resultList.isPlaylist;
              this.youtubePlaylist.totalCount = resultList.totalCount;
              this.youtubePlaylist.nextToken = resultList.nextToken;
              this.youtubePlaylist.youtubePlaylistInfos = this.youtubePlaylist.youtubePlaylistInfos.concat(resultList.youtubePlaylistInfos);
            }

            this.searchData.nextToken = this.youtubePlaylist.nextToken;
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.isVideoListSearching = false;
        }
      },
      err => {
        console.error(err);
        this.isVideoListSearching = false;
      });

  }

}
