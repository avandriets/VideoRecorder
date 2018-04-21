import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {v4 as uuid} from 'uuid';

// own resources
import {VideoElement} from './player.model';


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

export class MediaSet {
  id: string;
  collectionName: string;
  recordings: VideoCollectionItem[] = [];

  constructor(mediaObj?: {collectionName: string, recordings: VideoCollectionItem[]}) {
    if (mediaObj) {
      this.collectionName = mediaObj.collectionName;
      this.recordings = mediaObj.recordings;
      this.id = uuid();
    }
  }

  getVideoByStartTime(startTime: number): VideoCollectionItem {
    return this.recordings.find((item: VideoCollectionItem) => item.startTime === startTime);
  }

  getFinishTime(): number {
    if (this.recordings.length > 0) {
      return this.recordings[this.recordings.length - 1].finishTime;
    } else {
      return -1;
    }
  }
}

export class PlayerForm implements OnDestroy {
  onDestroy$: Subject<any> = new Subject<any>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
