import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Lazy load most components, since the user may not visit most of these pages during
 * any given session.
 */
const routes: Routes = [
  {
    path: 'family',
    loadChildren: () => import('./modules/family/family.module').then(m => m.FamilyModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/event/event.module').then(m => m.AddEventModule)
  },
  {
    path: 'birthdays',
    loadChildren: () => import('./modules/tasks/birthdays/birthdays.module').then(m => m.BirthdaysTaskModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }