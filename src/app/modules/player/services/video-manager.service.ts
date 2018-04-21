import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


// own resources
import {RecorderState} from '../../../model/recorder.model';
import {PlayerState, VideoElement, videoSource} from '../../../model/player.model';
import {VideoCollectionItem} from '../../../model/model';
import {MediaApiService} from '../../../core/services/media-api.service';


@Injectable()
export class VideoManagerService {

  private recorderStateStream: BehaviorSubject<RecorderState> = new BehaviorSubject<RecorderState>(RecorderState.Stop);
  private videoStream: BehaviorSubject<{ video: VideoElement, firstStart: boolean }> = null;
  private playerManagementStream: Subject<PlayerState> = new Subject<PlayerState>();

  currentVideoSet: VideoCollectionItem[] = [];

  constructor(private mediaApi: MediaApiService) {
    this.videoStream =
      new BehaviorSubject<{ video: VideoElement, firstStart: boolean }>({video: videoSource[0], firstStart: true});
  }

  initVideoStream() {
    const video = this.videoStream.getValue().video;
    this.videoStream =
      new BehaviorSubject<{ video: VideoElement, firstStart: boolean }>({video: video, firstStart: true});
  }

  startRecord() {
    this.currentVideoSet = [];

    const recordTimer = TimerObservable.create(0, 1)
      .takeUntil(this.recorderStateStream.filter((state: RecorderState) => state === RecorderState.Stop));

    this.videoStream =
      new BehaviorSubject<{ video: VideoElement, firstStart: boolean }>({video: videoSource[0], firstStart: true});

    this.videoStream.pipe(withLatestFrom(recordTimer))
      .takeUntil(this.recorderStateStream.filter((state: RecorderState) => state === RecorderState.Stop))
      .subscribe((streamData: [{video: VideoElement, firstStart: boolean}, number]) => {
          this.addVideoExtract(streamData[0].video, streamData[1]);
        }
      );

    const finishRecording = this.recorderStateStream.pipe(withLatestFrom(recordTimer))
      .subscribe((streamData: any[]) => {
          this.addStopToVideoExtract(streamData[1]);
          finishRecording.unsubscribe();
        }
      );
  }

  getRecordStateStream(): BehaviorSubject<RecorderState> {
    return this.recorderStateStream;
  }

  getVideoStream(): BehaviorSubject<{ video: VideoElement, firstStart: boolean }> {
    return this.videoStream;
  }

  getPlayerManagementStream(): Subject<PlayerState> {
    return this.playerManagementStream;
  }

  addVideoExtract(videoItem: VideoElement, startTime: number) {
    if (this.currentVideoSet.length > 0) {
      const lastElement: VideoCollectionItem = this.currentVideoSet.pop();
      lastElement.finishTime = startTime;
      this.currentVideoSet.push(lastElement);
    }
    this.currentVideoSet.push(new VideoCollectionItem(videoItem, startTime, 0));
  }

  addStopToVideoExtract(finishTime: number) {
    if (this.currentVideoSet.length > 0) {
      const lastElement: VideoCollectionItem = this.currentVideoSet.pop();
      lastElement.finishTime = finishTime;
      this.currentVideoSet.push(lastElement);
    }
  }

  saveSetToService(setName: string): Observable<{ success: boolean, message: string }> {
    return this.mediaApi.saveRecording(setName, this.currentVideoSet).map((response: { success: boolean, message: string }) => {
      if (response.success) {
        this.currentVideoSet = [];
      }
      return response;
    });
  }

}
