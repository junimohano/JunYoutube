import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CaptionInfo } from '../models/caption-info.model';
import { VideoInfo } from '../models/video-info.model';
import {
  SetIsLoadingPlaylist,
  SetisLoadingPlaylistItems,
  SetIsLoadingVideo,
  SetSelectedCaptionInfo,
  SetSelectedVideoInfo,
} from './youtube.actions';

export interface YoutubeStateModel {
  isLoadingVideo: boolean;
  isLoadingPlaylist: boolean;
  isLoadingPlaylistItems: boolean;
  selectedVideoInfo: VideoInfo;
  selectedCaptionInfo: CaptionInfo;
}

@State<YoutubeStateModel>({
  name: 'youtube',
  defaults: {
    isLoadingVideo: false,
    isLoadingPlaylist: false,
    isLoadingPlaylistItems: false,
    selectedVideoInfo: null,
    selectedCaptionInfo: null
  }
})
export class YoutubeState {
  constructor() { }

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

  @Action(SetIsLoadingVideo)
  setIsLoadingVideo({ patchState }: StateContext<YoutubeStateModel>, { payload }: SetIsLoadingVideo) {
    patchState({ isLoadingVideo: payload });
  }

  @Action(SetIsLoadingPlaylist)
  setIsLoadingPlaylist({ patchState }: StateContext<YoutubeStateModel>, { payload }: SetIsLoadingPlaylist) {
    patchState({ isLoadingPlaylist: payload });
  }

  @Action(SetisLoadingPlaylistItems)
  setisLoadingPlaylistItems({ patchState }: StateContext<YoutubeStateModel>, { payload }: SetisLoadingPlaylistItems) {
    patchState({ isLoadingPlaylistItems: payload });
  }

  @Action(SetSelectedVideoInfo)
  setSelectedVideoInfo({ patchState }: StateContext<YoutubeStateModel>, { payload }: SetSelectedVideoInfo) {
    patchState({ selectedVideoInfo: payload });
  }

  @Action(SetSelectedCaptionInfo)
  setSelectedCaptionInfo({ patchState }: StateContext<YoutubeStateModel>, { payload }: SetSelectedCaptionInfo) {
    patchState({ selectedCaptionInfo: payload });
  }
}
