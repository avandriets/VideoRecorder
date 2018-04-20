import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own resources
import {PlayerComponent} from './components/player/player.component';
import {PlayerRoutingModule} from './player-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  declarations: [PlayerComponent]
})
export class PlayerModule {
}
