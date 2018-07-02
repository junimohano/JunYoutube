import { DomSanitizer } from '@angular/platform-browser';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CaptionInfo } from './models/caption-info.model';
import { Playlist } from './models/playlist.model';
import { SearchData } from './models/search-data.model';
import { VideoInfo } from './models/video-info.model';
import { Video } from './models/video.model';
import { YoutubeService } from './services/youtube.service';
import {
  SearchPlaylist,
  SearchVideo,
  SetIsLoadingPlaylist,
  SetIsLoadingVideo,
  SetPlaylist,
  SetSearchDataNextToken,
  SetSearchDataUrl,
  SetSelectedCaptionInfo,
  SetSelectedVideoInfo,
  SetVideo,
} from './youtube.actions';

export interface YoutubeStateModel {
  searchData: SearchData;
  video: Video;
  playlist: Playlist;
  isLoadingVideo: boolean;
  isLoadingPlaylist: boolean;
  isLoadingPlaylistItems: boolean;
  selectedVideoInfo: VideoInfo;
  selectedCaptionInfo: CaptionInfo;
  searchForm: {
    model: any,
    dirty: boolean,
    status: string,
    errors: any
  };
}

@State<YoutubeStateModel>({
  name: 'youtube',
  defaults: {
    searchData: {
      inputUrl: '',
      firstUrl: '',
      url: '',
      index: '',
      nextToken: null,
      videoExtension: '',
      audioBitrate: 0,
      resolution: 0
    },
    video: null,
    playlist: null,
    isLoadingVideo: false,
    isLoadingPlaylist: false,
    isLoadingPlaylistItems: false,
    selectedVideoInfo: null,
    selectedCaptionInfo: null,
    searchForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class YoutubeState {
  constructor(
    private youtubeApiService: YoutubeService,
    private sanitizer: DomSanitizer) { }

  @Selector()
  static getSearchData(state: YoutubeStateModel): SearchData {
    return state.searchData;
  }

  @Selector()
  static getVideo(state: YoutubeStateModel): Video {
    return state.video;
  }

  @Selector()
  static getPlaylist(state: YoutubeStateModel): Playlist {
    return state.playlist;
  }

  @Selector()
  static getIsLoadingVideo(state: YoutubeStateModel): boolean {
    return state.isLoadingVideo;
  }

  @Selector()
  static getIsLoadingPlaylist(state: YoutubeStateModel): boolean {
    return state.isLoadingPlaylist;
  }

  @Selector()
  static getIsLoadingPlaylistItems(state: YoutubeStateModel): boolean {
    return state.isLoadingPlaylistItems;
  }

  @Selector()
  static getSelectedVideoInfo(state: YoutubeStateModel): VideoInfo {
    return state.selectedVideoInfo;
  }

  @Selector()
  static getSelectedCaptionInfo(state: YoutubeStateModel): CaptionInfo {
    return state.selectedCaptionInfo;
  }

  @Action(SetSearchDataUrl)
  setSearchDataUrl({ patchState, getState }: StateContext<YoutubeStateModel>, { url, isReset }: SetSearchDataUrl) {
    const state = getState();
    if (isReset) {
      patchState({
        searchData: {
          ...state.searchData,
          index: '',
          nextToken: null,
          firstUrl: url,
          inputUrl: url,
          url: url
        }
      });
    } else {
      patchState({
        searchData: { ...state.searchData, url: url }
      });
    }
  }

  @Action(SetSearchDataNextToken)
  setSearchDataNextToken({ patchState, getState }: StateContext<YoutubeStateModel>, { nextToken }: SetSearchDataNextToken) {
    const state = getState();
    patchState({ searchData: { ...state.searchData, nextToken: nextToken } });
  }

  @Action(SetVideo)
  setVideo({ patchState }: StateContext<YoutubeStateModel>, { video }: SetVideo) {
    patchState({ video: video });
  }

  @Action(SetPlaylist)
  setPlaylist({ patchState }: StateContext<YoutubeStateModel>, { playlist }: SetPlaylist) {
    patchState({ playlist: playlist });
  }

  @Action(SetIsLoadingVideo)
  setIsLoadingVideo({ patchState }: StateContext<YoutubeStateModel>, { isLoadingVideo }: SetIsLoadingVideo) {
    patchState({ isLoadingVideo: isLoadingVideo });
  }

  @Action(SetIsLoadingPlaylist)
  setIsLoadingPlaylist({ patchState }: StateContext<YoutubeStateModel>, action: SetIsLoadingPlaylist) {
    if (action.isReset) {
      patchState({ isLoadingPlaylist: action.isLoadingPlaylist });
    } else {
      patchState({ isLoadingPlaylistItems: action.isLoadingPlaylist });
    }
  }

  @Action(SetSelectedVideoInfo)
  setSelectedVideoInfo({ patchState }: StateContext<YoutubeStateModel>, { videoInfo }: SetSelectedVideoInfo) {
    patchState({ selectedVideoInfo: videoInfo });
  }

  @Action(SetSelectedCaptionInfo)
  setSelectedCaptionInfo({ patchState }: StateContext<YoutubeStateModel>, { captionInfo }: SetSelectedCaptionInfo) {
    patchState({ selectedCaptionInfo: captionInfo });
  }

  @Action(SearchVideo, { cancelUncompleted: true })
  searchVideo({ getState, dispatch }: StateContext<YoutubeStateModel>) {
    dispatch([
      new SetVideo(null),
      new SetIsLoadingVideo(true)
    ]);

    this.youtubeApiService.getYoutubeVideo(getState().searchData)
      .subscribe(
        result => {
          try {
            if (result) {
              result.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + result.id);
              dispatch([
                new SetVideo(result),
                new SetSelectedVideoInfo(result.videoInfos.length > 0 ? result.videoInfos[0] : null),
                new SetSelectedCaptionInfo(result.captionInfos.length > 0 ? result.captionInfos[0] : null)
              ]);
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          dispatch(new SetIsLoadingVideo(false));
        }, () => {
          dispatch(new SetIsLoadingVideo(false));
        });
  }

  @Action(SearchPlaylist, { cancelUncompleted: true })
  searchPlaylist({ getState, dispatch }: StateContext<YoutubeStateModel>, { isReset }: SearchPlaylist) {
    dispatch(new SetIsLoadingPlaylist(true, isReset));

    this.youtubeApiService.getYoutubePlaylist(getState().searchData)
      .subscribe(
        result => {
          try {
            if (result) {
              const playlist = getState().playlist;
              if (playlist == null) {
                dispatch(new SetPlaylist(result));
              } else {
                dispatch(new SetPlaylist({
                  ...playlist,
                  isPlaylist: result.isPlaylist,
                  totalCount: result.totalCount,
                  nextToken: result.nextToken,
                  playlistInfos: playlist.playlistInfos.concat(result.playlistInfos)
                }));
              }

              dispatch(new SetSearchDataNextToken(result.nextToken));
            }
          } catch (error) {
            console.error(error);
          }
        },
        err => {
          console.error(err);
          dispatch(new SetIsLoadingPlaylist(false, isReset));
        }, () => {
          dispatch(new SetIsLoadingPlaylist(false, isReset));
        });
  }
}
