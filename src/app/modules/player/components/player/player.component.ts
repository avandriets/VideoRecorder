import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


// own resources
import {videoSource, VideoStorage} from '../../../../model/player.model';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  currentVideoNumber = null;

  @ViewChild('videoElement') videoElement: ElementRef = null;

  timer: Observable<number> = new BehaviorSubject<number>(0);
  onDestroy$: Subject<any> = new Subject<any>();


  constructor() {
  }

  ngOnInit() {
  }

  onPlayVideo(videoId: number) {
    if (videoId !== this.currentVideoNumber) {
      this.videoElement.nativeElement.src = videoSource.find((item: VideoStorage) => item.id === videoId).url;
    } else {
      this.videoElement.nativeElement.load();
    }
    this.currentVideoNumber = videoId;
  }

  onLoadVideo() {
    console.log('video was loaded.');
  }

  onRecStop() {
    // this.timer = TimerObservable.create(0, 1)
    //   .takeUntil(this.onDestroy$).map((value) => {
    //       console.log('time value: ', value);
    //       return value;
    //     }
    //   );
  }

}
