interface Playlist {
    isPlaylist: boolean;
    totalCount: number;
    nextToken: string;

    playlistInfos: PlaylistInfo[];
}
