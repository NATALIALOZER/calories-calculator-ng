import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'schedule', loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: '', redirectTo: 'initialize', pathMatch: 'full'
  },
  {
    path: 'meal', loadChildren: () => import('./pages/meal/meal.module').then(m => m.MealModule)
  },
  {
    path: 'initialize', loadChildren: () => import('./pages/initialize/initialize.module').then(m => m.InitializeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
