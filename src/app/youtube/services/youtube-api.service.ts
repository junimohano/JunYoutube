import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Video } from '../models/video.model';

@Injectable()
export class YoutubeApiService {
  private readonly apiUrl = '/api/v1';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getYoutubeVideo(searchData: SearchData): Observable<Video> {
    return this.http
      .post<Video>(`${environment.webApiUrl}${this.apiUrl}/Videos`, searchData, { headers: this.headers });
  }

  getYoutubePlaylist(searchData: SearchData): Observable<Playlist> {
    return this.http
      .post<Playlist>(`${environment.webApiUrl}${this.apiUrl}/Playlists`, searchData, { headers: this.headers });
  }
}
