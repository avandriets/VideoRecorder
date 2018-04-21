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
