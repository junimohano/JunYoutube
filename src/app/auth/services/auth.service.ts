import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AccessTokenStorage } from './access-token-storage';

@Injectable()
export class AuthService {
  private headers = new HttpHeaders();
  private body: HttpParams;

  constructor(
    private httpClient: HttpClient,
    private accessTokenStorage: AccessTokenStorage) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.body = new HttpParams()
      .set('client_id', '4987568954769')
      .set('client_secret', 'd3m2bnpkljfEjfkHGWhj6cl8')
      .set('grant_type', 'client_credentials')
      .set('scope', 'junyoutube');
  }

  loadAccessToken(): Observable<string> {
    return this.httpClient.post<any>(`${environment.identityServerUrl}/connect/token`, this.body, { headers: this.headers })
      .pipe(tap(token => this.setAccessToken(token)));
  }

  private setAccessToken(token: any): void {
    this.accessTokenStorage.set(token.access_token);
  }
}
