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

  getDownload() {
    // return this.http.get(`${environment.webApiUrl}/api/v1/YoutubeConvert`);
    return Observable.create(observer => {
      const req = new XMLHttpRequest();
      req.open('get', `${environment.webApiUrl}/api/v1/YoutubeConvert`);
      req.responseType = 'arraybuffer';
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          observer.next(req.response);
          observer.complete();
        }
      };
      req.send();
    });
  }

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
