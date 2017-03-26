import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideo } from '../shared/models/youtube-video';
import { YoutubeApiService } from '../shared/services/youtube-api.service';
import { YoutubeCaptionInfo } from '../shared/models/youtube-caption-info';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  @Input() searchData: SearchData;

  youtubeVideo: YoutubeVideo;
  selectedVideo: YoutubeVideoInfo;
  selectedCaption: YoutubeCaptionInfo;
  isVideoSearching = false;
  isDownloadingVideo = false;

  constructor(private sanitizer: DomSanitizer, private youtubeApiService: YoutubeApiService, private snackBar: MdSnackBar) { }

  ngOnInit() { }

  getYoutubeVideo(url: string) {
    this.isVideoSearching = true;
    this.youtubeVideo = null;

    this.searchData.url = url;

    this.youtubeApiService.getYoutubeVideo(this.searchData)
      .subscribe(
      result => {
        try {
          if (result.status === 200) {
            this.youtubeVideo = result.json();
            // tslint:disable-next-line:max-line-length
            this.youtubeVideo.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.youtubeVideo.id);
            this.youtubeVideo.youtubeCaptionInfos.forEach((cap) => { // foreach statement
              cap.captionSafeUrl = this.sanitizer.bypassSecurityTrustUrl(cap.captionUrl);
            });
            this.selectedVideo = this.youtubeVideo.youtubeVideoInfos.length > 0 ? this.youtubeVideo.youtubeVideoInfos[0] : null;
            this.selectedCaption = this.youtubeVideo.youtubeCaptionInfos.length > 0 ? this.youtubeVideo.youtubeCaptionInfos[0] : null;
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

  downloadVideoDecryption() {
    if (this.selectedVideo.requiresDecryption) {
      this.isDownloadingVideo = true;
      this.searchData.videoExtension = this.selectedVideo.videoExtension;
      this.searchData.audioBitrate = this.selectedVideo.audioBitrate;
      this.searchData.resolution = this.selectedVideo.resolution;

      this.youtubeApiService.getYoutubeVideoDecryption(this.searchData)
        .subscribe(
        result => {
          try {
            if (result.status === 200) {
              const youtubeVideoInfo: YoutubeVideoInfo = result.json();
              if (youtubeVideoInfo != null) {
                this.selectedVideo.downloadUrl = youtubeVideoInfo.downloadUrl;
                this.selectedVideo.requiresDecryption = false;
                this.downloadVideo();
              }
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          if (this.isDownloadingVideo) {
            this.isDownloadingVideo = false;
          }
        }, () => {
          if (this.isDownloadingVideo) {
            this.isDownloadingVideo = false;
          }
        });
    } else {
      this.downloadVideo();
    }
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

}
