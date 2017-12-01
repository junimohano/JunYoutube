import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YoutubeVideo } from 'app/shared/models/youtube-video';

@Injectable()
export class YoutubeApiService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getYoutubeVideo(searchData: SearchData): Observable<YoutubeVideo> {
    return this.http
      .post<YoutubeVideo>(`${environment.webApiUrl}/api/v1/YoutubeVideo`, JSON.stringify(searchData), { headers: this.headers });
  }

  getYoutubePlaylist(searchData: SearchData): Observable<YoutubePlaylist> {
    return this.http
      .post<YoutubePlaylist>(`${environment.webApiUrl}/api/v1/YoutubePlaylist`, JSON.stringify(searchData), { headers: this.headers });
  }

  // getDownload() {
  //   // return this.http.get(`${environment.webApiUrl}/api/v1/YoutubeConvert`);
  //   return Observable.create(observer => {
  //     const req = new XMLHttpRequest();
  //     req.open('get', `${environment.webApiUrl}/api/v1/YoutubeConvert`);
  //     req.responseType = 'arraybuffer';
  //     req.onreadystatechange = function () {
  //       if (req.readyState === 4 && req.status === 200) {
  //         observer.next(req.response);
  //         observer.complete();
  //       }
  //     };
  //     req.send();
  //   });
  // }

  // getUrlData(url: string) {
  //   return Observable.create(observer => {
  //     const req = new XMLHttpRequest();
  //     req.open('get', url);
  //     req.responseType = 'arraybuffer';
  //     req.onreadystatechange = function () {
  //       if (req.readyState === 4 && req.status === 200) {
  //         observer.next(req.response);
  //         observer.complete();
  //       }
  //     };
  //     req.send();
  //   });
  // }
}
