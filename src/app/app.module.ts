import 'hammerjs';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  FlexLayoutModule
];

const ngxsModules = [
  NgxsModule.forRoot([], { developmentMode: !environment.production }),
  NgxsReduxDevtoolsPluginModule.forRoot({ maxAge: 25, disabled: environment.production }),
  NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
  NgxsRouterPluginModule.forRoot(),
  NgxsFormPluginModule.forRoot()
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routes,
    ...materialModules,
    ...ngxsModules,
    AuthModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
