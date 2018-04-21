import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';


// own resources
import {MediaSet, VideoCollectionItem} from '../../model/model';


@Injectable()
export class MediaApiService {

  recordingsCollection: BehaviorSubject<MediaSet[]> = new BehaviorSubject<MediaSet[]>([]);

  constructor(private http: HttpClient) {
  }

  saveRecording(setName: string, videoSet: VideoCollectionItem[]): Observable<{ success: boolean, message: string }> {
    if (environment.useMockData) {
      const mediaCollection: MediaSet[] = this.recordingsCollection.getValue();
      mediaCollection.push(new MediaSet({collectionName: setName, recordings: videoSet}));
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

  deleteItem(item: MediaSet): Observable<{ success: boolean, message: string }> {
    if (environment.useMockData) {
      const mediaCollection: MediaSet[] = this.recordingsCollection.getValue();
      mediaCollection.splice(mediaCollection.indexOf(item), 1);
      this.recordingsCollection.next(mediaCollection);
      return Observable.of({success: true, message: 'Ok'});
    } else {
      const url = `${environment.mediaServerURL}/addRecording/${item.id}`;
      return this.http.delete<{ success: boolean, message: string }>(url).flatMap(
        (response) => {
          return this.getMediaCollection().map(
            (getResp) => {
              return response;
            }
          );
        }
      );
    }
  }

  getVideoDistribution(): Observable<{name: string, percentages: number}[]> {
    return Observable.of([{name: 'video-1', percentages: 30}, {name: 'video-2', percentages: 25}, {name: 'video-3', percentages: 45}]);
  }

  getAverageRate(): Observable<{collectionName: string, rate: number}[]> {
    return Observable.of([{collectionName: 'collection-1', rate: 30}, {collectionName: 'collection-2', rate: 25}]);
  }
}
