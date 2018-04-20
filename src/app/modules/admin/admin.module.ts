import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// own resources
import {AdminComponent} from './components/admin/admin.component';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: '', redirectTo: '/errors/404'},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminComponent]
})
export class AdminModule {
}
