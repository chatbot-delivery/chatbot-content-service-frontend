import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailogListComponent } from './components/dailog-list/dailog-list.component';

const routes: Routes = [
  {
    path: '', component: DailogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
