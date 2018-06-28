import { CaptionInfo } from '../models/caption-info.model';
import { Playlist } from '../models/playlist.model';
import { VideoInfo } from '../models/video-info.model';
import { Video } from '../models/video.model';

export class SetSearchDataUrl {
  static readonly type = '[youtube] set SetSearchDataUrl';
  constructor(public url: string) { }
}

export class SetSearchDataNextToken {
  static readonly type = '[youtube] set SetSearchDataNextToken';
  constructor(public nextToken: string) { }
}

export class SetVideo {
  static readonly type = '[youtube] set SetVideo';
  constructor(public video: Video) { }
}

export class SetPlaylist {
  static readonly type = '[youtube] set SetPlaylist';
  constructor(public playlist: Playlist) { }
}

export class SetIsLoadingVideo {
  static readonly type = '[youtube] set IsLoadingVideo';
  constructor(public isLoadingVideo: boolean) { }
}

export class SetIsLoadingPlaylist {
  static readonly type = '[youtube] set IsLoadingPlaylist';
  constructor(
    public isLoadingPlaylist: boolean,
    public isReset: boolean) { }
}

export class SetSelectedVideoInfo {
  static readonly type = '[youtube] set SelectedVideoInfo';
  constructor(public videoInfo: VideoInfo) { }
}

export class SetSelectedCaptionInfo {
  static readonly type = '[youtube] set SelectedCaptionInfo';
  constructor(public captionInfo: CaptionInfo) { }
}

export class SearchVideo {
  static readonly type = '[youtube] set SearchVideo';
  constructor() { }
}

export class SearchPlaylist {
  static readonly type = '[youtube] set SearchPlaylist';
  constructor(public isReset: boolean) { }
}
