import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const router: Routes = [
  { path: '', redirectTo: 'watch', pathMatch: 'full' },
  { path: 'watch', loadChildren: './youtube/youtube.module#YoutubeModule' },
  { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
