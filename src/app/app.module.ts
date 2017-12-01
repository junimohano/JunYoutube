import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.router';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { YoutubeApiService } from './shared/services/youtube-api.service';

import { AppComponent } from './app.component';
import { YoutubePlaylistComponent } from './youtube-playlist/youtube-playlist.component';
import { YoutubeVideoComponent } from './youtube-video/youtube-video.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatToolbarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    YoutubePlaylistComponent,
    YoutubeVideoComponent,
    SearchComponent,
    NavComponent,
    YoutubeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    routes,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FlexLayoutModule,
  ],
  providers: [YoutubeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
