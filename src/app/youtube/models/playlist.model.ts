import { PlaylistInfo } from './playlist-info.model';

export interface Playlist {
  isPlaylist: boolean;
  totalCount: number;
  nextToken: string;

  playlistInfos: PlaylistInfo[];
}
