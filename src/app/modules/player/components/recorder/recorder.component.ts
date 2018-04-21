import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';


// own resources
import {VideoManagerService} from '../../services/video-manager.service';
import {RecorderState} from '../../../../model/recorder.model';


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit, OnDestroy {

  recorderState = RecorderState;
  onDestroy$: Subject<any> = new Subject<any>();

  constructor(public videoManager: VideoManagerService) {
    this.videoManager.getRecordState()
      .takeUntil(this.onDestroy$)
      .subscribe((stateOfRecorder: RecorderState) => {
          if (stateOfRecorder === RecorderState.Record) {
            this.videoManager.startStopRecord();
          }
        }
      );
  }

  ngOnInit() {
  }

  onRecStop() {
    this.videoManager.getRecordState()
      .next(this.videoManager.getRecordState().getValue() === RecorderState.Record ? RecorderState.Stop : RecorderState.Record);
  }

  ngOnDestroy(): void {
    this.videoManager.getRecordState().next(RecorderState.Stop);
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
