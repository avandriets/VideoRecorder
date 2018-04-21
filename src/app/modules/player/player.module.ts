import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own resources
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {PlayerRoutingModule} from './player-routing.module';
import { RecorderComponent } from './components/recorder/recorder.component';
import { VideoManagerComponent } from './components/video-manager/video-manager.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import {VideoManagerService} from './services/video-manager.service';


@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  declarations: [VideoPlayerComponent, RecorderComponent, VideoManagerComponent, PlayListComponent],
  providers: [VideoManagerService]
})
export class PlayerModule {
}
