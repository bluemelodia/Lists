import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'family',
    loadChildren: () => import('./modules/family/family.module').then(m => m.FamilyModule)
  },
  {
    path: 'add-birthday',
    loadChildren: () => import('./modules/event/event.module').then(m => m.AddEventModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }