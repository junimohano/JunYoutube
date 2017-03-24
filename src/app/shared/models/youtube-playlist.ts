interface YoutubePlaylist {
    isPlaylist: boolean;
    totalCount: number;
    nextToken: string;

    youtubePlaylistInfos: YoutubePlaylistInfo[];
}
