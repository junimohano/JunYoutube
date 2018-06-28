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
