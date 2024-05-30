import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './modules/articles/components/article-detail/article-detail.component';
import { authGuard } from './modules/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  // Auth routes
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/auth/auth.routes'),
  },
  {
    path: 'articles',
    loadChildren: () => import('./modules/articles/articles.routes'),
  },
];
