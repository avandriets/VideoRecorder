import {Component, OnInit} from '@angular/core';
import {MediaApiService} from '../../services/media-api.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

  constructor(public mediaApi: MediaApiService) {
  }

  ngOnInit() {
  }

}
