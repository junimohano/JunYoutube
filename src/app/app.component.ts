import { Component } from '@angular/core';
import { YoutubeApiService } from './shared/services/youtube-api.service';
import * as FileSaver from 'file-saver';
import { environment } from "environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  constructor(private youtubeApiService: YoutubeApiService) {

  }

  test() {

    const save = document.createElement('a');
    save.href = `${environment.webApiUrl}/api/v1/YoutubeConvert`;
    save.target = '_blank';
    // save.download = `${environment.webApiUrl}/api/v1/YoutubeConvert`;
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    save.dispatchEvent(evt);
    (window.URL).revokeObjectURL(save.href);

    // this.youtubeApiService.getDownload()
    //   .subscribe(data => {
    //     FileSaver.saveAs(new Blob([data]), 'output.mp4');
    //   });
  }
}
