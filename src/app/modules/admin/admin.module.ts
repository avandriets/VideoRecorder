import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


// own resources
import {AdminComponent} from './components/admin/admin.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: '', redirectTo: '/errors/404'},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CoreModule,
    HttpClientModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {
}
