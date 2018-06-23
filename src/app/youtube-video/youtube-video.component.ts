import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { CaptionInfo } from '../shared/models/youtube-caption-info';
import { YoutubeVideo } from '../shared/models/youtube-video';
import { YoutubeApiService } from '../shared/services/youtube-api.service';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {
  @Input() searchData: SearchData;

  youtubeVideo: YoutubeVideo;
  selectedVideo: VideoInfo;
  selectedCaption: CaptionInfo;
  isVideoSearching = false;

  constructor(private sanitizer: DomSanitizer, private youtubeApiService: YoutubeApiService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  getYoutubeVideo(url: string) {
    this.isVideoSearching = true;
    this.youtubeVideo = null;

    this.searchData.url = url;

    this.youtubeApiService.getYoutubeVideo(this.searchData)
      .subscribe(
        result => {
          try {
            if (result) {
              this.youtubeVideo = result;
              // tslint:disable-next-line:max-line-length
              this.youtubeVideo.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.youtubeVideo.id);
              this.selectedVideo = this.youtubeVideo.videoInfos.length > 0 ? this.youtubeVideo.videoInfos[0] : null;
              this.selectedCaption = this.youtubeVideo.captionInfos.length > 0 ? this.youtubeVideo.captionInfos[0] : null;
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          this.isVideoSearching = false;
        }, () => {
          this.isVideoSearching = false;
        });
  }

  private downloadVideo() {
    this.downloadFile(this.selectedVideo.downloadUrl);
    this.snackBar.open(`downloading ${this.youtubeVideo.title}...`, 'close', {
      duration: 2000,
    });
  }

  downloadCaption() {
    this.downloadFile(this.selectedCaption.captionUrl);
    this.snackBar.open(`downloading ${this.selectedCaption.languageFullName}...`, 'close', {
      duration: 2000,
    });
  }

  private downloadFile(fileUrl: string) {
    const save = document.createElement('a');
    save.href = fileUrl;
    save.target = '_blank';
    save.download = fileUrl;
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    save.dispatchEvent(evt);
    (window.URL).revokeObjectURL(save.href);
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = ' ' + s;
    }
    return s;
  }

}
