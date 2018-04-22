import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


// own resources
import {VideoManagerService} from '../../services/video-manager.service';
import {RecorderState} from '../../../../model/recorder.model';
import {PlayerState} from '../../../../model/player.model';
import {MediaApiService} from '../../../../core/services/media-api.service';


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit, OnDestroy {

  recorderState = RecorderState;
  onDestroy$: Subject<any> = new Subject<any>();
  form: FormGroup;

  constructor(public videoManager: VideoManagerService, private fb: FormBuilder, private mediaApi: MediaApiService) {
    this.videoManager.getRecordStateStream()
      .takeUntil(this.onDestroy$)
      .subscribe((stateOfRecorder: RecorderState) => {
          if (stateOfRecorder === RecorderState.Record) {
            this.videoManager.startRecord();
          }
        }
      );

    this.form = fb.group({
      setName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onRecordStartStop() {
    this.videoManager.getPlayerManagementStream().next(PlayerState.Pause);
    this.videoManager.getRecordStateStream()
      .next(this.videoManager.getRecordStateStream().getValue() === RecorderState.Record ? RecorderState.Stop : RecorderState.Record);
  }

  ngOnDestroy(): void {
    this.videoManager.getRecordStateStream().next(RecorderState.Stop);
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSaveSet() {
    this.videoManager.saveSetToService(this.form.value['setName'])
      .subscribe((response: { success: boolean, message: string }) => {
          this.form.patchValue({setName: ''});
          this.mediaApi.dataChanging.next(true);
        }, error => {
          console.error('Cannot save data', error);
        }
      );
  }

}
