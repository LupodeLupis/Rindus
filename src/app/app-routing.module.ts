import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Lazy loading Module syntax
const routes: Routes = [
  { path: 'posts', loadChildren: () => import('./modules/components/posts/posts.module').then(m => m.PostsModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
