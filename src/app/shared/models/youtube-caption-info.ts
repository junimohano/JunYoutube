import { SafeUrl } from '@angular/platform-browser/platform-browser';

export interface YoutubeCaptionInfo {
    id: string;
    language: string;
    languageFullName: string;
    captionName: string;
    captionUrl: string;

    captionSafeUrl: SafeUrl;
}
