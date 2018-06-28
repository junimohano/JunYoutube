import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { CaptionInfo } from './models/caption-info.model';
import { VideoInfo } from './models/video-info.model';
import {
  SearchPlaylist,
  SearchVideo,
  SetPlaylist,
  SetSearchDataUrl,
  SetSelectedCaptionInfo,
  SetSelectedVideoInfo,
} from './shared/youtube.actions';
import { YoutubeState } from './shared/youtube.state';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeComponent implements OnInit {
  @Select(YoutubeState.getSearchData) searchData$;
  @Select(YoutubeState.getVideo) video$;
  @Select(YoutubeState.getPlaylist) playlist$;
  @Select(YoutubeState.getSelectedVideoInfo) selectedVideoInfo$;
  @Select(YoutubeState.getSelectedCaptionInfo) selectedCaptionInfo$;
  @Select(YoutubeState.getIsLoadingVideo) isLoadingVideo$;
  @Select(YoutubeState.getIsLoadingPlaylist) isLoadingPlaylist$;
  @Select(YoutubeState.getIsLoadingPlaylistItems) isLoadingPlaylistItems$;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSearchVideo(url: string): void {
    this.store.dispatch([
      new SetSearchDataUrl(url),
      new SearchVideo()
    ]);
  }

  onSearchPlaylist(isReset: boolean): void {
    const searchData = this.store.selectSnapshot(YoutubeState.getSearchData);
    if (isReset) {
      this.store.dispatch(new SetPlaylist(null));
    } else {
      this.store.dispatch(new SetSearchDataUrl(searchData.firstUrl));
    }

    this.store.dispatch(new SearchPlaylist(isReset));
  }

  onDownloadVideo(): void {
    const selectedVideoInfo = this.store.selectSnapshot(YoutubeState.getSelectedVideoInfo);
    this.downloadFile(selectedVideoInfo.downloadUrl);
    const video = this.store.selectSnapshot(YoutubeState.getVideo);
    this.snackBar.open(`downloading ${video.title}...`, 'close', {
      duration: 2000,
    });
  }

  onDownloadCaption(): void {
    const selectedCaptionInfo = this.store.selectSnapshot(YoutubeState.getSelectedCaptionInfo);
    this.downloadFile(selectedCaptionInfo.captionUrl);
    this.snackBar.open(`downloading ${selectedCaptionInfo.languageFullName}...`, 'close', {
      duration: 2000,
    });
  }

  onChangeSelectedVideoInfo(videoInfo: VideoInfo): void {
    this.store.dispatch(new SetSelectedVideoInfo(videoInfo));
  }

  onChangeSelectedCaptionInfo(captionInfo: CaptionInfo): void {
    this.store.dispatch(new SetSelectedCaptionInfo(captionInfo));
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
