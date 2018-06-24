interface SearchData {
    inputUrl: string | undefined;
    firstUrl: string;

    url: string;
    index: string;
    nextToken: string | null;

    videoExtension: string;
    audioBitrate: number;
    resolution: number;
}