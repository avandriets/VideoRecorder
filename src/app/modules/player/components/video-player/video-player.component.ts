import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

// own resources
import {videoSource, VideoElement, PlayerState} from '../../../../model/player.model';
import {VideoManagerService} from '../../services/video-manager.service';
import {PlayerForm} from '../../../../model/model';


@Component({
  selector: 'app-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent extends PlayerForm implements OnInit {

  @ViewChild('videoElement') videoElement: ElementRef = null;

  constructor(public videoManager: VideoManagerService) {
    super();
    this.videoManager.getPlayerManagementStream()
      .takeUntil(this.onDestroy$)
      .filter(playerEvent => playerEvent === PlayerState.Pause)
      .subscribe(playerEvent => {
        this.videoElement.nativeElement.pause();
      });
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
