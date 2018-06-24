import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YoutubeComponent } from './youtube.component';

const youtubeRoutes: Routes = [
  {
    path: '',
    component: YoutubeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(youtubeRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class YoutubeRoutingModule { }
