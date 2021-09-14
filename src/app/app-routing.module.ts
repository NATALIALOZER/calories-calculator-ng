import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'calendar', loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: '', redirectTo: 'calendar', pathMatch: 'full'
  },
  {
    path: 'meal', loadChildren: () => import('./pages/meal/meal.module').then(m => m.MealModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
