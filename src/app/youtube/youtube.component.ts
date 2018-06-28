import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';

import { CaptionInfo } from './models/caption-info.model';
import { Playlist } from './models/playlist.model';
import { SearchData } from './models/search-data.model';
import { VideoInfo } from './models/video-info.model';
import { Video } from './models/video.model';
import { YoutubeApiService } from './services/youtube-api.service';
import { SetIsLoadingPlaylist, SetisLoadingPlaylistItems, SetIsLoadingVideo } from './shared/youtube.actions';
import { YoutubeState } from './shared/youtube.state';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Select(YoutubeState.getIsLoadingVideo) isLoadingVideo$;
  @Select(YoutubeState.getIsLoadingPlaylist) isLoadingPlaylist$;
  @Select(YoutubeState.getIsLoadingPlaylistItems) isLoadingPlaylistItems$;

  constructor(
    private sanitizer: DomSanitizer,
    private youtubeApiService: YoutubeApiService,
    private store: Store,
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

  onChangeSelectedVideoInfo(videoInfo: VideoInfo): void {
    this.selectedVideoInfo = videoInfo;
  }

  onChangeSelectedCaptionInfo(captionInfo: CaptionInfo): void {
    this.selectedCaptionInfo = captionInfo;
  }

  private setLoadingVideo(isLoading: boolean): void {
    this.store.dispatch(new SetIsLoadingVideo(isLoading));
  }

  private setLoadingPlaylist(isReset: boolean, isLoading: boolean): void {
    if (isReset) {
      this.store.dispatch(new SetIsLoadingPlaylist(isLoading));
    } else {
      this.store.dispatch(new SetisLoadingPlaylistItems(isLoading));
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
