import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';

const routes: Routes = [
  {
    path: '',
    component: AddBirthdayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }