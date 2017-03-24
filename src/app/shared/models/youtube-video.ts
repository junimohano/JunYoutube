import { SafeUrl } from '@angular/platform-browser/platform-browser';
import { YoutubeCaptionInfo } from './youtube-caption-info';

export interface YoutubeVideo {
    id: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnailUrl: string;
    duration: string;
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    viewCount: number;

    embedUrl: SafeUrl;

    youtubeVideoInfos: YoutubeVideoInfo[];
    youtubeCaptionInfos: YoutubeCaptionInfo[];
}
