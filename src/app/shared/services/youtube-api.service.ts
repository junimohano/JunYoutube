import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { YoutubeVideo } from '../models/youtube-video';

@Injectable()
export class YoutubeApiService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getYoutubeVideo(searchData: SearchData): Observable<YoutubeVideo> {
    return this.http
      .post<YoutubeVideo>(`${environment.webApiUrl}/api/v1/Videos`, JSON.stringify(searchData), { headers: this.headers });
  }

  getYoutubePlaylist(searchData: SearchData): Observable<YoutubePlaylist> {
    return this.http
      .post<YoutubePlaylist>(`${environment.webApiUrl}/api/v1/Playlists`, JSON.stringify(searchData), { headers: this.headers });
  }
}
