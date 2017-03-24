import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YoutubeComponent } from './youtube/youtube.component';

export const router: Routes = [
    { path: '', redirectTo: 'watch', pathMatch: 'full' },
    { path: 'watch', component: YoutubeComponent },
    { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
