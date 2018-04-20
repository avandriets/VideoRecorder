import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// own resources
import {VideoManagerComponent} from './components/video-manager/video-manager.component';


const routes: Routes = [
  {path: '', component: VideoManagerComponent},
  {path: '', redirectTo: '/errors/404'},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {
}
