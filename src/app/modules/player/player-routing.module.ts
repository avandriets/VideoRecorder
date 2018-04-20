import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// own resources
import {PlayerComponent} from './components/player/player.component';


const routes: Routes = [
  {path: '', component: PlayerComponent},
  {path: '', redirectTo: '/errors/404'},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {
}
