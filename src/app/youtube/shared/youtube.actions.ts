import { CaptionInfo } from '../models/caption-info.model';
import { VideoInfo } from '../models/video-info.model';

export class SetIsLoadingVideo {
  static readonly type = '[youtube] set IsLoadingVideo';
  constructor(public payload: boolean) { }
}

export class SetIsLoadingPlaylist {
  static readonly type = '[youtube] set IsLoadingPlaylist';
  constructor(public payload: boolean) { }
}

export class SetisLoadingPlaylistItems {
  static readonly type = '[youtube] set IsLoadingPlaylistItems';
  constructor(public payload: boolean) { }
}

export class SetSelectedVideoInfo {
  static readonly type = '[youtube] set SelectedVideoInfo';
  constructor(public payload: VideoInfo) { }
}

export class SetSelectedCaptionInfo {
  static readonly type = '[youtube] set SelectedCaptionInfo';
  constructor(public payload: CaptionInfo) { }
}
