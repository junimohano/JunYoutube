import { SafeUrl } from '@angular/platform-browser/platform-browser';

import { CaptionInfo } from './caption-info.model';

export interface Video {
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

  videoInfos: VideoInfo[];
  captionInfos: CaptionInfo[];
}
