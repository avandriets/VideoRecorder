import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';


// own resources
import {MediaApiService} from '../../../../core/services/media-api.service';
import {MediaSet, PlayerForm} from '../../../../model/model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends PlayerForm implements OnInit {

  recordsList: Observable<MediaSet[]> = new Observable<MediaSet[]>();

  constructor(public mediaApi: MediaApiService) {
    super();
    this.recordsList = this.mediaApi.getMediaCollection();
  }

  ngOnInit() {
  }

  onDeleteItem(item: MediaSet) {
    this.mediaApi.deleteItem(item).subscribe(
      (response) => {
        this.recordsList = this.mediaApi.getMediaCollection();
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}
