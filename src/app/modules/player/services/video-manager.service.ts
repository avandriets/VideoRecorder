import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {withLatestFrom} from 'rxjs/operators';


// own resources
import {RecorderState} from '../../../model/recorder.model';
import {VideoElement, videoSource} from '../../../model/player.model';



export class VideoCollectionItem {
  private _video: VideoElement;
  private _startTime: number;
  private _finishTime: number;

  constructor(video: VideoElement, startTime: number, finishTime: number) {
    this._video = video;
    this._startTime = startTime;
    this._finishTime = finishTime;
  }

  get video(): VideoElement {
    return this._video;
  }

  set video(value: VideoElement) {
    this._video = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get finishTime(): number {
    return this._finishTime;
  }

  set finishTime(value: number) {
    this._finishTime = value;
  }
}


@Injectable()
export class VideoManagerService {

  private recorderState: BehaviorSubject<RecorderState> = new BehaviorSubject<RecorderState>(RecorderState.Stop);
  private videoStream: BehaviorSubject<{ video: VideoElement, firstStart: boolean }> = null;

  currentVideoSet: VideoCollectionItem[] = [];

  constructor() {
    this.videoStream =
      new BehaviorSubject<{ video: VideoElement, firstStart: boolean }>({video: videoSource[0], firstStart: true});
  }

  startStopRecord() {
    this.currentVideoSet = [];

    const recordTimer = TimerObservable.create(0, 1)
      .takeUntil(this.recorderState.filter((state: RecorderState) => state === RecorderState.Stop));

    this.videoStream =
      new BehaviorSubject<{ video: VideoElement, firstStart: boolean }>({video: videoSource[0], firstStart: true});

    this.videoStream.pipe(withLatestFrom(recordTimer))
      .takeUntil(this.recorderState.filter((state: RecorderState) => state === RecorderState.Stop))
      .subscribe(
        (streamData: any[]) => {
          this.addVideoExtract(streamData[0], streamData[1]);
        }
      );

    const finishRecording = this.recorderState.pipe(withLatestFrom(recordTimer))
      .subscribe(
        (streamData: any[]) => {
          this.addStopToVideoExtract(streamData[1]);
          finishRecording.unsubscribe();
        }
      );
  }

  getRecordState(): BehaviorSubject<RecorderState> {
    return this.recorderState;
  }

  getVideoStream(): BehaviorSubject<{ video: VideoElement, firstStart: boolean }> {
    return this.videoStream;
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

}
