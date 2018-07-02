import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthResolver } from 'src/app/auth';

export const router: Routes = [
  { path: '', redirectTo: 'watch', pathMatch: 'full' },
  {
    path: 'watch',
    loadChildren: './youtube/youtube.module#YoutubeModule',
    resolve: {
      auth: AuthResolver
    }
  },
  { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
