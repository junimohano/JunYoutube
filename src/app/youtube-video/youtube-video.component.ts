import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideo } from '../shared/models/youtube-video';
import { YoutubeApiService } from '../shared/services/youtube-api.service';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  @Input() searchData: SearchData;

  isVideoSearching = false;
  youtubeVideo: YoutubeVideo;

  constructor(private sanitizer: DomSanitizer, private youtubeApiService: YoutubeApiService) { }

  ngOnInit() { }

  getYoutubeVideo(url: string) {
    this.isVideoSearching = true;
    this.youtubeVideo = null;

    this.searchData.url = url;

    this.youtubeApiService.getYoutubeVideo(this.searchData)
      .subscribe(
      result => {
        try {
          if (result.status === 200) {
            this.youtubeVideo = result.json();
            // tslint:disable-next-line:max-line-length
            this.youtubeVideo.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.youtubeVideo.id);
            this.youtubeVideo.youtubeCaptionInfos.forEach((cap) => { // foreach statement
              cap.captionSafeUrl = this.sanitizer.bypassSecurityTrustUrl(cap.captionUrl);
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.isVideoSearching = false;
        }
      },
      err => {
        console.error(err);
      });
  }

}
