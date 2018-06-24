interface YoutubePlaylist {
    isPlaylist: boolean;
    totalCount: number;
    nextToken: string;

    playlistInfos: PlaylistInfo[];
}
