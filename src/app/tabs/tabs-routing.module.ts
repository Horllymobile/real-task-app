import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'todos',
        loadChildren: () =>
          import('./todo-list/todo-list.module').then(
            (m) => m.TodoListPageModule
          ),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./analytics/analytics.module').then(
            (m) => m.AnalyticsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/todos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
