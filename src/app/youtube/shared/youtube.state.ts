import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SetIsLoadingPlaylist, SetisLoadingPlaylistItems, SetIsLoadingVideo } from './youtube.actions';

export interface YoutubeStateModel {
  isLoadingVideo: boolean;
  isLoadingPlaylist: boolean;
  isLoadingPlaylistItems: boolean;
}

@State<YoutubeStateModel>({
  name: 'youtube',
  defaults: {
    isLoadingVideo: false,
    isLoadingPlaylist: false,
    isLoadingPlaylistItems: false
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
}
