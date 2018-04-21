import {Component, OnInit} from '@angular/core';


// own resources
import {MediaApiService} from '../../../../core/services/media-api.service';
import {MediaSet} from '../../../../model/model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public mediaApi: MediaApiService) {
  }

  ngOnInit() {
  }

  onDeleteItem(item: MediaSet) {
    this.mediaApi.deleteItem(item);
  }
}
