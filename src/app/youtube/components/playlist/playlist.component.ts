import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() searchData: SearchData;
  @Input() playlist: Playlist;
  @Input() isLoadingPlaylist: boolean;

  @Output() searchVideo = new EventEmitter<string>();
  @Output() searchPlaylist = new EventEmitter<boolean>();

  private readonly youtubeUrl = 'https://www.youtube.com/watch?v=';

  constructor() { }

  ngOnInit() {
  }

  onClick(videoId: string) {
    this.searchVideo.emit(`${this.youtubeUrl}${videoId}`);
  }
}
