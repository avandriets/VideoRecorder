import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

// own resources
import {videoSource, VideoElement} from '../../../../model/player.model';
import {VideoManagerService} from '../../services/video-manager.service';


@Component({
  selector: 'app-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoElement') videoElement: ElementRef = null;

  constructor(public videoManager: VideoManagerService) {
  }

  ngOnInit() {
  }

  onPlayVideo(videoId: number) {
    const video = videoSource.find((item: VideoElement) => item.id === videoId);

    if (video) {
      this.videoManager.getVideoStream().next({video: video, firstStart: false});
    }
  }

  onLoadVideo() {
    if (!this.videoManager.getVideoStream().getValue().firstStart) {
      this.videoElement.nativeElement.play();
    }
  }

}
