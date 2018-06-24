import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SearchData } from '../../models/search-data.model';
import { VideoInfo } from '../../models/video-info.model';
import { Video } from '../../models/video.model';
import { CaptionInfo } from './../../models/caption-info.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit {
  @Input() searchData: SearchData;
  @Input() video: Video;
  @Input() selectedVideoInfo: VideoInfo;
  @Input() selectedCaptionInfo: CaptionInfo;
  @Input() isLoadingVideo: boolean;

  @Output() downloadVideo = new EventEmitter<any>();
  @Output() downloadCaption = new EventEmitter<any>();
  @Output() changeSelectedVideoInfo = new EventEmitter<VideoInfo>();
  @Output() changeSelectedCaptionInfo = new EventEmitter<CaptionInfo>();

  constructor() { }

  ngOnInit() { }
}
