import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { CaptionInfo } from './models/caption-info.model';
import { Video } from './models/video.model';
import { YoutubeApiService } from './services/youtube-api.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
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
  video: Video;
  playlist: Playlist;
  selectedVideoInfo: VideoInfo;
  selectedCaptionInfo: CaptionInfo;
  selectedVideoId: string;
  isLoadingVideo = false;
  isLoadingPlaylist = false;
  isLoadingPlaylistItems = false;

  constructor(
    private sanitizer: DomSanitizer,
    private youtubeApiService: YoutubeApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSearchVideo(url: string): void {
    this.video = null;
    this.searchData.url = url;
    this.setLoadingVideo(true);
    this.youtubeApiService.getYoutubeVideo(this.searchData)
      .subscribe(
        result => {
          try {
            if (result) {
              this.video = result;
              // tslint:disable-next-line:max-line-length
              this.video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.id);
              this.selectedVideoInfo = this.video.videoInfos.length > 0 ? this.video.videoInfos[0] : null;
              this.selectedCaptionInfo = this.video.captionInfos.length > 0 ? this.video.captionInfos[0] : null;
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          this.setLoadingVideo(false);
        }, () => {
          this.setLoadingVideo(false);
        });
  }

  onSearchPlaylist(isReset: boolean): void {
    if (isReset) {
      this.playlist = null;
    } else {
      this.searchData.url = this.searchData.firstUrl;
    }

    this.setLoadingPlaylist(isReset, true);
    this.youtubeApiService.getYoutubePlaylist(this.searchData)
      .subscribe(
        result => {
          try {
            if (result) {
              const resultList: Playlist = result;
              if (this.playlist == null) {
                this.playlist = resultList;
              } else {
                this.playlist.isPlaylist = resultList.isPlaylist;
                this.playlist.totalCount = resultList.totalCount;
                this.playlist.nextToken = resultList.nextToken;
                this.playlist.playlistInfos = this.playlist.playlistInfos.concat(resultList.playlistInfos);
              }

              this.searchData.nextToken = this.playlist.nextToken;
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          this.setLoadingPlaylist(isReset, false);
        }, () => {
          this.setLoadingPlaylist(isReset, false);
        });
  }

  onDownloadVideo(): void {
    this.downloadFile(this.selectedVideoInfo.downloadUrl);
    this.snackBar.open(`downloading ${this.video.title}...`, 'close', {
      duration: 2000,
    });
  }

  onDownloadCaption(): void {
    this.downloadFile(this.selectedCaptionInfo.captionUrl);
    this.snackBar.open(`downloading ${this.selectedCaptionInfo.languageFullName}...`, 'close', {
      duration: 2000,
    });
  }

  private setLoadingVideo(isLoading: boolean): void {
    this.isLoadingVideo = isLoading;
  }

  private setLoadingPlaylist(isReset: boolean, isLoading: boolean): void {
    if (isReset) {
      this.isLoadingPlaylist = isLoading;
    } else {
      this.isLoadingPlaylistItems = isLoading;
    }
  }

  private downloadFile(fileUrl: string): void {
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
