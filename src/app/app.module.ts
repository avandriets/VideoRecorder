import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// own resources
import {AppComponent} from './app.component';
import {SharedModule} from './modules/shared/shared.module';


const routes: Routes = [
  {path: '', redirectTo: 'player', pathMatch: 'full'},
  {path: 'player', loadChildren: 'app/modules/player/player.module#PlayerModule'},
  {path: 'admin', loadChildren: 'app/modules/admin/admin.module#AdminModule'},
  {path: 'errors', loadChildren: 'app/modules/errors/errors.module#ErrorsModule'},
  {path: '**', redirectTo: 'errors', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), SharedModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
