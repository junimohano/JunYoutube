import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from 'src/app/auth';

import { PlaylistComponent } from './components/playlist/playlist.component';
import { SearchComponent } from './components/search/search.component';
import { VideoComponent } from './components/video/video.component';
import { YoutubeService } from './services/youtube.service';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubeComponent } from './youtube.component';
import { YoutubeState } from './youtube.state';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
    NgxsModule.forFeature([YoutubeState]),
    NgxsFormPluginModule,
    AuthModule.forChild()
  ],
  declarations: [
    YoutubeComponent,
    VideoComponent,
    PlaylistComponent,
    SearchComponent
  ],
  providers: [
    YoutubeService
  ]
})
export class YoutubeModule { }
