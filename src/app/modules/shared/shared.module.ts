import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// own resources
import {NavBarComponent} from './components/nav-bar/nav-bar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [NavBarComponent],
  exports: [NavBarComponent]
})
export class SharedModule {
}
