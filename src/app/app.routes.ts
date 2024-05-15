import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './modules/articles/components/article-detail/article-detail.component';

export const routes: Routes = [
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  // Auth routes
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.routes'),
  },
  {
    path: 'articles',
    loadChildren: () => import('./modules/articles/articles.routes'),
  },
];
