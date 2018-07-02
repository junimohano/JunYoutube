import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AccessTokenStorage } from './services/access-token-storage';
import { AuthResolver } from './services/auth.resolver';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './services/jwt-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthResolver,
        AuthService,
        AccessTokenStorage
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
      ]
    };
  }
}

