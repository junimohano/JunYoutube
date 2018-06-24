import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Video } from '../../models/video.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() searchData: SearchData;
  @Input() video: Video;
  @Input() playlist: Playlist;
  @Input() selectedVideoId: string;
  @Input() isLoadingPlaylist: boolean;
  @Input() isLoadingPlaylistItems: boolean;

  @Output() searchVideo = new EventEmitter<string>();
  @Output() searchPlaylist = new EventEmitter<boolean>();

  private readonly youtubeUrl = 'https://www.youtube.com/watch?v=';

  constructor() { }

  ngOnInit() {
  }

  onClick(videoId: string) {
    const videoUrl = `${this.youtubeUrl}${videoId}`;
    this.searchVideo.emit(videoUrl);
  }
}
