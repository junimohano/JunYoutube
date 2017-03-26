import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YoutubeApiService {

  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getYoutubeVideo(searchData: SearchData) {
    return this.http.post(`${environment.webApiUrl}/api/v1/YoutubeVideo`, JSON.stringify(searchData), { headers: this.headers });
  }

  getYoutubePlaylist(searchData: SearchData) {
    return this.http.post(`${environment.webApiUrl}/api/v1/YoutubePlaylist`, JSON.stringify(searchData), { headers: this.headers });
  }

  getYoutubeVideoDecryption(searchData: SearchData) {
    return this.http.post(`${environment.webApiUrl}/api/v1/YoutubeVideoDecryption`, JSON.stringify(searchData), { headers: this.headers });
  }

}
