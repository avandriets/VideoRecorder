import { Component, OnInit } from '@angular/core';
import {VideoManagerService} from '../../services/video-manager.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

  constructor(public videoManager: VideoManagerService) { }

  ngOnInit() {
  }

}
