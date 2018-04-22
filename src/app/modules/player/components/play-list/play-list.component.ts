import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Observable} from 'rxjs/Observable';

// own resources
import {MediaApiService} from '../../../../core/services/media-api.service';
import {MediaSet, VideoCollectionItem} from '../../../../model/model';
import {VideoManagerService} from '../../services/video-manager.service';
import {RecorderState} from '../../../../model/recorder.model';
import {PlayerState} from '../../../../model/player.model';


@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit, OnDestroy {

  onDestroy$: Subject<any> = new Subject<any>();
  recordsList: Observable<MediaSet[]> = new Observable<MediaSet[]>();

  constructor(public mediaApi: MediaApiService, private videoManager: VideoManagerService) {
  }

  ngOnInit() {
    this.recordsList = this.mediaApi.getMediaCollection();
    this.mediaApi.dataChanging.subscribe(
      (items) => {
        this.recordsList = this.mediaApi.getMediaCollection();
      }
    );
  }

  onPlayRecording(item: MediaSet) {
    this.videoManager.getRecordStateStream().next(RecorderState.Play);
    const recordTimer = TimerObservable.create(0, 1)
      .takeUntil(this.onDestroy$)
      .subscribe(
        value => {
          const video: VideoCollectionItem = item.getVideoByStartTime(value);
          if (video) {
            this.videoManager.getVideoStream().next({video: video.getVideo(), firstStart: false});
          }

          if (value === item.getFinishTime()) {
            this.videoManager.getPlayerManagementStream().next(PlayerState.Pause);
            this.videoManager.getRecordStateStream().next(RecorderState.Stop);
            recordTimer.unsubscribe();
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
