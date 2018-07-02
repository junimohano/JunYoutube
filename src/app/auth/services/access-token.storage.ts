import { Injectable } from '@angular/core';

@Injectable()
export class AccessTokenStorage {
  private readonly key = 'access-token';

  constructor() { }

  set(accessToken: string): void {
    localStorage.removeItem(this.key);
    localStorage.setItem(this.key, accessToken);
  }

  get(): string {
    return localStorage.getItem(this.key);
  }
}
