import { Component, OnInit } from '@angular/core';

// own resources
import {VideoManagerService} from '../../services/video-manager.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.css']
})
export class VideoManagerComponent implements OnInit {

  constructor(private mediaManager: VideoManagerService) { }

  ngOnInit() {
    this.mediaManager.initVideoStream();
  }

}
