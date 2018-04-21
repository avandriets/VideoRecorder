import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


// own resources
import {MediaSet, VideoCollectionItem} from '../../../model/model';


@Injectable()
export class MediaApiService {

  recordingsCollection: BehaviorSubject<MediaSet[]> = new BehaviorSubject<MediaSet[]>([]);

  constructor(private http: HttpClient) {
  }

  saveRecording(setName: string, videoSet: VideoCollectionItem[]): Observable<{ success: boolean, message: string }> {
    if (environment.useMockData) {
      const mediaCollection: MediaSet[] = this.recordingsCollection.getValue();
      mediaCollection.push(new MediaSet(setName, videoSet));
      this.recordingsCollection.next(mediaCollection);
      return Observable.of({success: true, message: 'Ok'});
    } else {
      const url = `${environment.mediaServerURL}/addRecording`;
      return this.http.post<{ success: boolean, message: string }>(url, {name: setName, recording: videoSet});
    }
  }

  getMediaCollection(): BehaviorSubject<MediaSet[]> {
    if (!environment.useMockData) {
      const url = `${environment.mediaServerURL}/getRecordings`;
      this.http.get<MediaSet[]>(url).map((items: MediaSet[]) => this.recordingsCollection.next(items));
    }
    return this.recordingsCollection;
  }
}
