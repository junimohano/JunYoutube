import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Playlist } from '../models/playlist.model';
import { SearchData } from '../models/search-data.model';
import { Video } from '../models/video.model';

@Injectable()
export class YoutubeService {
  private readonly apiUrl = '/api/v1';
  private headers = new HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getYoutubeVideo(searchData: SearchData): Observable<Video> {
    return this.http
      .post<Video>(`${environment.apiUrl}${this.apiUrl}/Videos`, searchData, { headers: this.headers });
  }

  getYoutubePlaylist(searchData: SearchData): Observable<Playlist> {
    return this.http
      .post<Playlist>(`${environment.apiUrl}${this.apiUrl}/Playlists`, searchData, { headers: this.headers });
  }
}
