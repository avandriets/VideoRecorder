import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {v4 as uuid} from 'uuid';

// own resources
import {VideoElement} from './player.model';


export class VideoCollectionItem {
  private video: VideoElement;
  private startTime: number;
  private finishTime: number;

  constructor(video: VideoElement, startTime: number, finishTime: number) {
    this.video = video;
    this.startTime = startTime;
    this.finishTime = finishTime;
  }

  getVideo(): VideoElement {
    return this.video;
  }

  setVideo(value: VideoElement) {
    this.video = value;
  }

  getStartTime(): number {
    return this.startTime;
  }

  setStartTime(value: number) {
    this.startTime = value;
  }

  getFinishTime(): number {
    return this.finishTime;
  }

  setFinishTime(value: number) {
    this.finishTime = value;
  }
}

export class MediaSet {
  id: number;
  collectionName: string;
  recordings: VideoCollectionItem[] = [];

  constructor(mediaObj?: { id?: number, collectionName: string, recordings: VideoCollectionItem[] }) {
    if (mediaObj) {
      this.collectionName = mediaObj.collectionName;
      this.recordings = mediaObj.recordings.map((item: any) => {
          return new VideoCollectionItem(item.video, item.startTime, item.finishTime);
        }
      );
      if (mediaObj.id) {
        this.id = mediaObj.id;
      } else {
        this.id = -1;
      }
    }
  }

  getVideoByStartTime(startTime: number): VideoCollectionItem {
    return this.recordings.find((item: VideoCollectionItem) => item.getStartTime() === startTime);
  }

  getFinishTime(): number {
    if (this.recordings.length > 0) {
      return this.recordings[this.recordings.length - 1].getFinishTime();
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
