import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// own resources
import {SharedModule} from '../shared/shared.module';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';


const routes: Routes = [
  {path: '404', component: ErrorNotFoundComponent},
  {path: '', redirectTo: '404'}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ErrorNotFoundComponent]
})
export class ErrorsModule {
}
