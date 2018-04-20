import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// own resources
import {videoSource, VideoStorage} from '../../../../model/player.model';


@Component({
  selector: 'app-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoElement') videoElement: ElementRef = null;
  behaviourSubject: BehaviorSubject<{video: VideoStorage, firstStart: boolean}> = null;

  constructor() {
    this.behaviourSubject = new BehaviorSubject<{video: VideoStorage, firstStart: boolean}>({video: videoSource[0], firstStart: true});
  }

  ngOnInit() {
  }

  onPlayVideo(videoId: number) {
    const video = videoSource.find((item: VideoStorage) => item.id === videoId);

    if (video) {
      this.behaviourSubject.next({video: video, firstStart: false});
    }
  }

  onLoadVideo() {
    if (!this.behaviourSubject.getValue().firstStart) {
      this.videoElement.nativeElement.play();
    }
  }

}
