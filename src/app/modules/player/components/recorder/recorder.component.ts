import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  timer: Observable<number> = new BehaviorSubject<number>(0);
  onDestroy$: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {
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
