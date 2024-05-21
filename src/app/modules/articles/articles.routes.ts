import { Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: ArticlesComponent,
  },
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'create-article',
    component: CreateArticleComponent,
  },
] as Routes;
